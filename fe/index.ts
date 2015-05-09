///<reference path='../myTypes/highlight.d.ts'/>
///<reference path='../myTypes/materialize.d.ts'/>

//hack for bootstrap like html/css frameworks
import $ = require('jquery');
window['jQuery'] = $;
import mat = require('materialize');
mat;
//end of hack
import React = require('react');
import fitBitApiDash = require('./ts/tcp-fit-bit');


React.render(fitBitApiDash.ApiDashboardFactory({}),document.getElementById('app'),()=>{
});



