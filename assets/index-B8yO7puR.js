import{r as h,j as e,c as F,F as k,u as V,a as _,b as I,d as T,e as z,L as A}from"./index-nxJALUib.js";import{B as y,u as B}from"./index-CmldIz-M.js";import{I as M}from"./index-DgjEUsD_.js";import{I as O}from"./index-D6wK--hf.js";import{L as $}from"./index-B47Rr9AT.js";import{C as p,c as f,a as D}from"./select-options-Bc2KEQqo.js";import{u as G}from"./formik.esm-vDdiJ82c.js";import"./index-IKp5EPTB.js";import"./placeholder-image-CBe2Di1M.js";const Q=()=>{const[s,o]=h.useState(!1),l=()=>{const r=document.documentElement.scrollTop;r>300?o(!0):r<=300&&o(!1)},n=()=>{window.scrollTo({top:0})};return window.addEventListener("scroll",l),e.jsx(y,{onClick:n,variant:"secondary",className:F("fixed !size-16 !rounded-full bottom-5 right-5 transition-all duration-1000",s?"opacity-70 visible":"opacity-0 invisible"),children:e.jsx(k,{className:"fill-orange400 stroke-transparent rotate-180 absolute inset-2 size-12"})})};var P={BASE_URL:"/swap-it-up-front/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const ee=()=>{const{t:s}=B(),[o,{data:l,isLoading:n}]=V(),{data:r}=_(),{data:u,isLoading:w}=I(),{values:t,handleSubmit:b,handleChange:j,setFieldValue:i,resetForm:C}=G({initialValues:{category:[],color:[],wantedCategory:[],search:""},onSubmit:()=>{o({search:g,category:c.map(({value:a})=>a),color:m.map(({value:a})=>a),wantedCategory:d.map(({value:a})=>a)})}}),{search:g,category:c,color:m,wantedCategory:d}=t;return h.useEffect(()=>{o({search:g,category:c.map(({value:a})=>a),color:m.map(({value:a})=>a),wantedCategory:d.map(({value:a})=>a)})},[c,m,d]),e.jsxs(e.Fragment,{children:[e.jsxs($,{children:[e.jsxs("form",{onSubmit:b,children:[e.jsxs("h3",{className:"text-2xl font-semibold mb-3 flex items-end gap-10",children:[s("Filters"),(t.category.length>0||t.color.length>0||t.wantedCategory.length>0||t.search)&&e.jsxs("span",{className:"font-[500] text-base flex items-center cursor-pointer hover:text-orange400",onClick:()=>C(),children:[s("clear all"),e.jsx(T,{className:"rotate-45 size-5"})]})]}),e.jsxs("div",{className:"flex gap-8 w-full mx-auto mb-6 items-end flex-wrap justify-between",children:[e.jsxs("div",{className:"flex gap-6 flex-wrap",children:[e.jsx(p,{label:s("Category"),placeholder:s("All"),isMulti:!0,options:f(r,s),onChange:a=>i("category",a),value:t.category,className:"min-w-[200px]"}),e.jsx(p,{label:s("Color"),placeholder:s("All"),isMulti:!0,options:D(u,s),onChange:a=>i("color",a),value:t.color,className:"min-w-[200px]"}),e.jsx(p,{label:s("Wanted categories"),placeholder:s("All"),isMulti:!0,options:f(r,s),onChange:a=>i("wantedCategory",a),value:t.wantedCategory,className:"min-w-[200px]"})]}),e.jsxs("div",{className:"flex max-w-[500px] min-w-[300px] w-full gap-4 h-[48px]",children:[e.jsx(O,{type:"text",name:"search",className:"shrink",inputClassName:"!border-orange100 border-[2px] !h-full",placeholder:s("What are you looking for?"),onChange:j,value:t.search}),e.jsx(y,{type:"submit",variant:"secondary",className:"shrink-0 font-semibold !bg-orange50 !p-[12px]",children:e.jsx(z,{})})]})]})]}),!l||n||w?e.jsx(A,{className:"mx-auto mt-10"}):e.jsx("div",{className:"items-grid",children:l.list.map(({id:a,name:v,description:N,category:E,wantedCategory:L,pictureIds:x,color:R})=>e.jsx(M,{id:a,img:x[0]?`${P.VITE_SERVER_URL}/items/pictures/${x[0]}`:"",title:v,category:E,description:N,wanted:L,color:u.list.find(({name:S})=>S===R)},a))})]}),e.jsx(Q,{})]})};export{ee as default};