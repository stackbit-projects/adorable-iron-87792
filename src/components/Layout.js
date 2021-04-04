import React from 'react';
import {Helmet} from 'react-helmet';
import _ from 'lodash';

import '../sass/main.scss';

export default class Body extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>{_.get(this.props, 'pageContext.frontmatter.title', null) && (_.get(this.props, 'pageContext.frontmatter.title', null) + ' - ')}{_.get(this.props, 'pageContext.site.siteMetadata.title', null)}</title>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initialScale=1.0" />
                    <meta name="description" content={_.get(this.props, 'pageContext.frontmatter.excerpt', null) || _.get(this.props, 'pageContext.site.siteMetadata.description', null)}/>
                    <link href="https://fonts.googleapis.com/css?family=Dancing+Script:wght@700&family=PT+Serif:400,400i,700,700i&display=swap" rel="stylesheet"/>
                    <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png"/>
                    <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png"/>
                    <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png"/>
                    <link rel="manifest" href="/images/favicon/site.webmanifest"></link>
                    {(_.get(this.props, 'pageContext.frontmatter.template', null) === 'post') && (
                    _.get(this.props, 'pageContext.frontmatter.canonical_url', null) && (
                    <link rel="canonical" href={_.get(this.props, 'pageContext.frontmatter.canonical_url', null)}/>
                    )
                    )}
                </Helmet>
                <div id="page" className={'site palette-' + _.get(this.props, 'pageContext.site.siteMetadata.palette', null)}>
                  {this.props.children}
                </div>
            </React.Fragment>
        );
    }
}
