/// <reference path="../../typings/tsd.d.ts"/>
///<reference path='../../myTypes/highlight.d.ts'/>
///<reference path='../../myTypes/materialize.d.ts'/>

import React = require('react');
import $ = require('jquery');

export interface ApiDashboardProps {
}
export interface ApiDashboardState {
  query:string;
  json:string;
}

class ApiDashboard extends React.Component<ApiDashboardProps,ApiDashboardState> {
  state:ApiDashboardState = null;

  handleChange(event:any) {
    var state:ApiDashboardState = {
      query: event.target.value,
      json: this.state.json
    };
    this.setState(state);
  }

  submitQuery(query?:string) {
    var q = query ? query : this.state.query;
    $.get('api/query', {query: q}, (data:any, textStatus:string, jqXHR:JQueryXHR)=> {
      if (data) {
        var state:ApiDashboardState = {
          query: q,
          json: typeof data !== "string" ? JSON.stringify(data, null, 2) : JSON.stringify(JSON.parse(data), null, 2)
        };
        this.setState(state);
      } else {
        console.log(textStatus);
      }
    }, 'json')
  }

  componentWillMount() {
    this.setState({
      query: '',
      json: JSON.stringify({
        best: 'test',
        json: 'object',
        EVER: '..yup'
      }, null, 4)
    })
  }

  handleKeyDown(e) {
    var ENTER = 13;
    if (e.keyCode == ENTER) {
      this.submitQuery();
    }
  }


  render() {
    return (
      React.createElement("div", null,
        React.createElement("nav", {className: "white", role: "navigation"},
          React.createElement("div", {className: "nav-wrapper container"},
            React.createElement("a", {id: "logo-container", href: "#", className: "brand-logo"}, "Logo"),
            React.createElement("ul", {className: "right hide-on-med-and-down"},
              React.createElement("li", null, React.createElement("a", {href: "#"}, "Navbar Link"))
            ),
            React.createElement("ul", {id: "nav-mobile", className: "side-nav"},
              React.createElement("li", null, React.createElement("a", {href: "#"}, "Navbar Link"))
            ),
            React.createElement("a", {
              href: "#",
              "data-activates": "nav-mobile",
              className: "button-collapse"
            }, React.createElement("i", {className: "mdi-navigation-menu"}))
          )
        ),
        React.createElement("div", {id: "index-banner", className: "parallax-container"},
          React.createElement("div", {className: "section no-pad-bot"},
            React.createElement("div", {className: "container"},
              React.createElement("br", null), React.createElement("br", null),
              React.createElement("h1", {className: "header center teal-text text-lighten-2"}, "Query Fit"),
              React.createElement("h5", {className: "header center teal-text text-lighten-2"}, "A query dashboard for your fitbit data"),
              React.createElement("div", {className: "row center"},
                React.createElement('h5', {className: 'header col s12 teal-text text-lighten-2'},
                  React.createElement('a', {
                    onClick: this.submitQuery.bind(this, ['/1/activities.json'])
                  }, 'For Example try: /1/activities.json')
                )
              ),
              React.createElement('div', {className: 'row center'},
                React.createElement('div', {className: 'input-field center'},
                  React.createElement("input", {
                    type: "text",
                    ref: 'query',
                    name: 'query',
                    onChange: (event) => {
                      var ENTER = 13;
                      if (event.keyCode == ENTER) {
                        this.submitQuery(event.target.value);
                      }
                      else {
                        this.handleChange(event);
                      }
                    }, className: 'tcp-fit-query-input'
                  })
                )
              ),
              React.createElement("div", {className: "row center"},
                React.createElement("div", {
                  //href: "http://materializecss.com/getting-started.html",
                  id: "search-button",
                  onClick: this.submitQuery.bind(this, null),
                  className: "btn-large waves-effect waves-light teal lighten-1"
                }, "Search")
              ),
              React.createElement("br", null), React.createElement("br", null)
            )
          ),
          React.createElement("div", {className: "parallax"}, React.createElement("img", {
            src: "/images/background1.jpg",
            alt: "Unsplashed background img 2"
          }))
        ),
        React.createElement("div", {className: "container"},
          React.createElement("div", {className: "section"},
            /*   Query Bar   */
            React.createElement("div", {className: "row"},
              React.createElement("div", {className: "col s12 m12 tcp-fit-query-bar"},
                React.createElement('div', {className: 'col s10 m11 tcp-fit-query-input-wrapper icon-block'})
              )
            ),

            React.createElement("div", {className: 'row'},
              React.createElement("div", {className: "col s12 m12"},
                React.createElement("div", {className: "icon-block result-block"},
                  React.createElement("h3", {className: "center"}, "Your Results"),
                  React.createElement("div", {className: "light"},
                    React.createElement('pre', {},
                      React.createElement('code', {className: 'json center'}, this.state.json)
                    )
                  )
                )
              )
            )
          )
        )
      )
    );
  }

  componentDidMount() {
    $('.button-collapse')['sideNav']();
    $('.parallax')['parallax']();
    (<any>this.refs['query']).getDOMNode().focus();
  }
}

export var ApiDashboardFactory = (props:ApiDashboardProps):React.ReactElement<ApiDashboardProps> => {
  return React.createElement(ApiDashboard, props);
};