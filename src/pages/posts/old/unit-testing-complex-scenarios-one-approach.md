---
title: "Unit testing complex scenarios - one approach"
date: "2011-07-03"
template: "post"
---

This is another of those ‘as much for my benefit’ as it is for the community posts.  On a sizeable project at work we’ve hit a ‘catch up on tests’ phase.  We don’t employ TDD, though obviously understand that testing is very important to the overall product (both in confidence on release, and confidence that changes to the code will break the build if functionality changes).  Our code coverage when we started this latest phase of work was terrible (somewhere around 20% functionality coverage with 924 tests) – after a couple of weeks of testing we’re up to fairly high coverage on our data access/repositories (>90%) and have significantly more tests (2,600 at last count).

We are following a UI –> Service –> Repository type pattern for our architecture which works very well for us – we’re using IoC, though perhaps only because of testability – the loose coupling benefits are obviously there.

We’re now at the point of testing our service implementations, and have significantly more to think about.  At the data access layer, external dependencies were literally only the database.  At service layer, we have other services as external dependencies, as well as repositories, so unit testing these required considerably more thought/discussion.  Thankfully I work with a very good team, so the approach we’ve taken here is very much a distillation of the outcomes from discussion with the team.

Couple of things about our testing:

### Confidence is King

The reason we write unit tests is manifold, but if I were to try to sum it up, it’s confidence.

Confidence that any changes to code that alter functionality break the build.

Confidence that the code is working as expected.

Confidence that we have solidly documented (through tests) the intent of the functionality and that someone (more often than not another developer in our case) has gone through a codebase and has reviewed it enough to map the pathways through it so that they can effectively test it.

Confidence plays a huge part for us as we implement a Continuous Integration process, and the longer term aim is to move towards Continuous Delivery.  Without solid unit testing at it’s core, I’d find it difficult to maintain the confidence in the build necessary to be able to reliably deploy once, twice or more per day.

### Test Functionality, Pathways and Use Cases, Not Lines of Code

100% code coverage is a lofty ideal, though I’d argue that if that is your primary goal, you’re thinking about it wrong.  We have often achieved 100% coverage, but done so via the testing of pathways through the system rather than focussing on just the lines of code.  We use business exceptions and very much take the approach that if a method can’t do what it advertises, an exception is thrown.

Something simple like ‘ValidateUserCanDeposit’ can throw the following:

```csharp
/// <exception cref="PaymentMoneyLaunderingLimitException">Thrown when the user is above their money laundering limit.</exception>
/// <exception cref="PaymentPaymentMethodChangingException">Thrown when the user is attempting to change their payment method.</exception>
/// <exception cref="PaymentPaymentMethodExpiredException">Thrown when the expiry date has already passed</exception>
/// <exception cref="PaymentPaymentMethodInvalidStartDateException">Thrown when the start date hasn't yet passed</exception>
/// <exception cref="PaymentPlayerSpendLimitException">Thrown when the user is above their spend limit.</exception>
/// <exception cref="PaymentPlayerSpendLimitNotFoundException">Thrown when we are unable to retrieve a spend limit for a user.</exception>
/// <exception cref="PaymentOverSiteDepositLimitException">Thrown when the user is over the sitewide deposit limit.</exception>
```

and these are calculated often by calls to external dependencies (in this case there are 4 calls away to external dependencies) – the business logic for ‘ValidateUserCanDeposit’ is:

1. Is the user over the maximum site deposit limit
2. Validate the user has remaining spend based upon responsible gambling limits- paymentRepository.GetPlayerSpendLimit
    
    - paymentRepository.GetUserSpendOverTimePeriod
3. GetPaymentMethodCurrent- paymentRepository.GetPaymentMethodCurrent
    
    - paymentRepository.GetCardPaymentMethodByPaymentMethodId
    
    - OR paymentRepository.GetPaypalPaymentMethodByPaymentMethodId
4. if we're changing payment method, ensure:- not over money laundering limit

So testing a pathway through this method, we can pass and fail at each of the lines listed above.  A pass is often denoted as silence (our code only gets noisy when something goes wrong), but each of those external dependencies themselves can throw potentially multiple exceptions.

We employ logging of our exceptions so again, we care that logging was called.

### Testing Framework and Naming Tests

NUnit is our tool of choice for writing unit tests – syntax is expressive, and it generally allows for very readable tests.  I’m a big fan of the test explaining the authors intent – being able to read and understand unit tests is a skill for sure, though once you’ve read a unit test, having it actually do what the author intended it to is another validator.

With that in mind, we tend to take the approach 'MethodUnderTest_TestState_ExpectedOutcome' approach.  A few examples of our unit test names:

- GetByUserId_ValidUserId_UserInCache_GetVolatileFieldsReturnsValidData_ReturnsValidUserObject
- GetPlaymateAtPointInTime_GivenCorrectUserAndDate_ValidPlaymateShouldExist
- GetCompetitionEntriesByCompetitionId_NoEntries_ShouldReturnEmptyCollection
- GetTransactionByUserIdAndTransactionId_DbException_ShouldThrowCoreSystemSqlException

Knowing what the author intended is half the battle when coming to a test 3months from now because it's failing after some business logic update.

### Mocking Framework

We use Moq as a mocking framework, and I’m a big fan of the power it brings to testing – yup, there are quite a number of steps to jump through to effectively setup and verify your tests, though again, these add confidence to the final result.

One note about mocking in general, and any number of people have written on this in far more eloquent terms than I.  **Never just mock enough data to pass the test.**

If we have a repository method called ‘GetTransactionsByUserAndDate’, ensure that your mocked transactions list also includes transactions from other users as well as transactions for the same user outside of the dates specified – getting a positive result when that is the only data that exists is one thing, getting a positive result when you have a diverse mocked data set with things that should not be returned again adds confidence that the code is doing specifically what it should be.

### Verifying vs. Asserting

We try very much to maintain a single assert per test (and only break that when we feel it necessary) – it keeps the mindset on testing a very small area of functionality, and makes the test more malleable/less brittle.

Verifying on the other hand (a construct supported by Moq and other framekworks) is something that we are more prolific with.

For example, if ‘paymentRepository.GetPlayerSpendLimit’ above throws an exception, I want to verify that ‘paymentRepository.GetUserSpendOverTimePeriod’ is not called – I also want to verify that we logged that exception.

The Assert from all of that is that the correct exception is thrown from the main method, but the verifies that are called as part of that test add confidence.

In our [TestTearDown] method we tend to place our ‘mock.Verify()’ methods to ensure that we verify those things that are able to be after each test.

## Enough waffle – where’s the code?

That one method above ‘ValidateUserCanDeposit’ has ended up with 26 tests – each one models a pathway through that method.  There is only one success path through that method – every other test demonstrates error paths.  So for example:

```csharp
[Test]
public void ValidateUserCanDeposit_GetPaymentMethodCurrent_ThrowsPaymentMethodNotFoundException_UserBalanceUnderMoneyLaunderingLimit_ShouldReturnPaymentMethod()
{
	var user = GetValidTestableUser(ValidUserId);
	user.Balance = 1m;

	// remaining spend
	paymentRepository.Setup( x => x.GetPlayerSpendLimit(ValidUserId)).Returns( new PlayerSpendLimitDto { Limit = 50000, Type = 'w' }).Verifiable();
	paymentRepository.Setup( x => x.GetUserSpendOverTimePeriod(ValidUserId, It.IsAny(), It.IsAny())).Returns( 0 ).Verifiable();

	// current payment method
	paymentRepository.Setup( x => x.GetPaymentMethodCurrent(ValidUserId))
						.Throws( new PaymentMethodNotFoundException("") ).Verifiable();

	IPaymentMethod paymentMethod = paymentService.ValidateUserCanDeposit(user, PaymentProviderType.Card);

	Assert.That(paymentMethod.CanUpdatePaymentMethod, Is.True);
	paymentRepository.Verify( x => x.GetCardPaymentMethodByPaymentMethodId(ValidCardPaymentMethodId), Times.Never());
	LogVerifier.VerifyLogExceptionCalled(logger, Times.Once());
}
```

That may seem like a complex test, but I’ve got the following from it:

- The author’s intent from the method signature:upon calling ValidateUserCanDeposit
    
    a call within that to GetPaymentMethodCurrent has thrown a PaymentMethodNotFoundException
    
    at that point, the users balance is below the money laundering limit for the site
    
    so the user should get a return that indicates that they can update their payment method
- That those methods that I expect to be hit *are* hit (using moq’s .Verifiable())
- That those methods that should not be called aren’t (towards the end of the test, Times.Never() verifies
- That we have logged the exception once and only once

Now that this test (plus the other 25) are in place, if a developer is stupid enough to bury an exception or remove a logging statement that the build will fail.

### Is this a good approach to testing?

I guess this is where the question opens up to you guys reading this.  Is this a good approach to testing?  The tests don’t feel brittle.  They feel like they’re focussing on one area at a time.  They feel like they are sure about what is going on in the underlying code.

Overkill?

Ways to improve them?

How do you unit test in this sort of situation? What software do you use? What problems have you faced?  Keen to get as much information as possible and hopefully help inform each other.

I’d love to get feedback on this.  It feels like it’s working well for us, but that doesn’t necessarily mean it’s right/good.
