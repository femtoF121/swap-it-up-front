import{r as m,v as d,U as u,_ as x,j as s,R as t,c as l,i as h}from"./index-BMSOC1w9.js";import{u as f,B as v}from"./index-4ONKnE8-.js";import{C as p}from"./index-BkKmWe5O.js";import{R as j}from"./index-Cugx3DnI.js";import{L as N}from"./index-CvyOsBeb.js";import{a as w}from"./avatar-placeholder-C3uXbfoF.js";var y={BASE_URL:"/swap-it-up-front/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const S=()=>{const[n,c]=m.useState(!1),{t:a}=f(),{id:o}=d(),{data:e,isLoading:r}=u(o),i=x(o);return console.log(i),s.jsxs(N,{children:[s.jsx(j,{to:t.HOME,children:a("return to Home page")}),s.jsxs("div",{className:"mx-auto w-full max-w-[400px] mt-6",children:[s.jsxs(p,{className:"w-full !p-8 flex flex-col items-center",children:[s.jsx("div",{className:"relative rounded-full overflow-hidden size-[250px]",children:r||i.isLoading?s.jsx("div",{className:"skeleton-loader"}):s.jsxs(s.Fragment,{children:[!n&&s.jsx("div",{className:"skeleton-loader"}),s.jsx("img",{src:i.data?`${y.VITE_SERVER_URL}/user/details/${e.id}/avatar`:w,alt:"avatar",className:l("rounded-full aspect-square h-[250px] object-cover",{hidden:!n}),onLoad:()=>c(!0),height:250,width:250})]})}),s.jsx("div",{className:l("relative mt-6",{"min-h-6 max-w-[250px] w-full":r,hidden:!(e!=null&&e.name||e!=null&&e.surname)&&!r}),children:r?s.jsx("div",{className:"skeleton-loader"}):s.jsxs("span",{className:"font-semibold text-2xl",children:[e==null?void 0:e.name," ",e==null?void 0:e.surname]})}),s.jsx("div",{className:l("relative mt-1",{"min-h-4 max-w-[150px] w-full":r,hidden:!(e!=null&&e.nickname)&&!r}),children:r?s.jsx("div",{className:"skeleton-loader"}):(e==null?void 0:e.nickname)&&s.jsx("span",{children:e==null?void 0:e.nickname})}),s.jsx("div",{className:l("relative mt-1",{"min-h-4 max-w-[300px] w-full":r,hidden:!(e!=null&&e.address.country||e!=null&&e.address.city)&&!r}),children:r?s.jsx("div",{className:"skeleton-loader"}):(!!(e!=null&&e.address.country)||!!(e!=null&&e.address.city))&&s.jsxs("span",{className:"text-white200",children:[e==null?void 0:e.address.country,(e==null?void 0:e.address.country)&&(e==null?void 0:e.address.city)&&", ",e==null?void 0:e.address.city]})})]}),s.jsx(h,{to:t.CHATS,children:s.jsx(v,{size:"sm",className:"w-full mt-4",children:a("Write to user")})})]})]})};export{S as default};
