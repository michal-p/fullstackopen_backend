(window.webpackJsonppart2=window.webpackJsonppart2||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(13),o=t.n(c),u=t(2),l=t(3),i=t.n(l),m="/api/persons",s=function(){return i.a.get(m).then((function(e){return console.log("getAll promise fulfilled"),e.data}))},f=function(e){return i.a.post(m,e).then((function(e){return console.log("create promise fulfilled"),e.data}))},d=function(e,n){return i.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.data}))},b=function(e){return i.a.put("".concat(m,"/").concat(e.id),e).then((function(e){return e.data}))},h=(t(36),function(e){var n=e.newFilter,t=e.handleFilter;return r.a.createElement("input",{value:n,onChange:t})}),p=function(e){var n=e.addPerson,t=e.newName,a=e.handleNewName,c=e.newNumber,o=e.handleNewNumber;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:a})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:c,onChange:o})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"Add")))},E=function(e){var n=e.name,t=e.number,a=e.deletePerson;return r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,n," ",t),r.a.createElement("button",{onClick:a},"delete"))},v=function(e){var n=e.persons,t=e.deletePerson;return n.map((function(e){return r.a.createElement(E,{key:e.name,name:e.name,number:e.number,deletePerson:function(){return t(e.id,e.name)}})}))},g=function(e){var n=e.message,t=e.type;return null===n?null:r.a.createElement("div",{className:t},n)},w=function(){return r.a.createElement("div",{style:{color:"green",fontStyle:"italic",fontSize:16}},r.a.createElement("br",null),r.a.createElement("em",null,"Note app, Department of Computer Science, University of Helsinki 2019"))},j=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],c=n[1],o=Object(a.useState)(""),l=Object(u.a)(o,2),i=l[0],m=l[1],E=Object(a.useState)(""),j=Object(u.a)(E,2),N=j[0],O=j[1],y=Object(a.useState)(""),S=Object(u.a)(y,2),k=S[0],C=S[1],P=Object(a.useState)(null),F=Object(u.a)(P,2),T=F[0],D=F[1],U=Object(a.useState)("note"),x=Object(u.a)(U,2),A=x[0],J=x[1];Object(a.useEffect)((function(){console.log("effect"),s().then((function(e){c(e)}))}),[]),console.log("render",t.length,"notes");var z=function(e,n){D(e),J(n),setTimeout((function(){D(null)}),5e3)},B=t.filter((function(e){return e.name.toUpperCase().includes(k.toUpperCase())}));return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(g,{message:T,type:A}),r.a.createElement(h,{newFilter:k,handleFilter:function(e){C(e.target.value)}}),r.a.createElement(p,{addPerson:function(e){e.preventDefault();var n=t.find((function(e){return e.name===i})),a=!0;n?(n.number=N,Object.keys(n).forEach((function(e){0===n[e].length&&(alert('"'.concat(e,'" is missing!')),a=!1)})),a&&window.confirm("".concat(n.name," is already in phonebook, replace the old number with new one?"))&&b(n).then((function(e){z("".concat(e.name," has a new number."),"note")})).catch((function(e){z("The person ".concat(n.name," does not exist."),"error"),c(t.filter((function(e){return e.id!==n.id})))}))):(n={name:i,number:N},Object.keys(n).forEach((function(e){a=a&&e.length&&n[e]})),a?f(n).then((function(e){z("".concat(e.name," has been created."),"note"),c(t.concat(e)),m(""),O("")})).catch((function(e){z("The person ".concat(n.name," is not possible to create."),"error")})):z("The person ".concat(n.name," has missing parameters."),"error"))},newName:i,handleNewName:function(e){m(e.target.value)},newNumber:N,handleNewNumber:function(e){O(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(v,{persons:B,deletePerson:function(e,n){window.confirm("Delete ".concat(n,"?"))&&d(e,n).then((function(a){c(t.filter((function(n){return n.id!==e}))),z("".concat(n," has been deleted."),"note")})).catch((function(a){z("The person ".concat(n," has been already deleted."),"error"),c(t.filter((function(n){return n.id!==e})))}))}}),r.a.createElement("div",null,"debug: ",i),r.a.createElement(w,null))};o.a.render(r.a.createElement(j,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.a0fd5b2f.chunk.js.map