import{n as A,o as D,r as x,j as e,c as b,B as p,p as _,q as B,t as O,v as T,w as L,a as q,b as M,R as z,L as $}from"./index-C64Kg7V9.js";import{T as G}from"./index-CF7hU2Ue.js";import{u as S,B as Q}from"./index-DXi33NMv.js";import{C as F}from"./index-BEniOsQF.js";import{R as U}from"./index-DrvcNOMo.js";import{I as H}from"./index-1UvaZd5v.js";import{L as V}from"./index-BOfBSZ49.js";import{a as I,c as R,C}from"./select-options-DpPH-1WH.js";import{S as E}from"./select-options-tV_qHAb1.js";import{e as J}from"./validation-schemas-CXdHtJPz.js";import{u as W}from"./formik.esm-ORMV1G-8.js";import{w as Y}from"./with-auth-Bk8tUVSr.js";const K=({setPicturesState:r,pictureIds:g=[]})=>{const{t:m}=S(),[n]=A(),[j]=D(),[s,d]=x.useState(g==null?void 0:g.map(a=>({id:a,preview:`https://swapitup.azurewebsites.net/api/items/pictures/${a}`}))),i=x.useRef(null),u=async a=>{const t=Array.from(a);if(t.some(({type:l})=>l!=="image/png"&&l!=="image/jpeg")){p.warn(m("file_has_to_be_png_or_jpg"),{className:"!bg-warn"});return}if(t.length+s.length>5){p.warn(m("You can upload up to 5 files."),{className:"!bg-warn"});return}const c=await Promise.all(t.map(async l=>{const h=await n(l);return{file:l,preview:URL.createObjectURL(l),id:h.data}}));d(l=>[...l,...c])},w=a=>{const t=a.currentTarget.files;t&&u(t)},y=a=>{a.preventDefault();const t=a.dataTransfer.files;t&&u(t)},f=async a=>{(await j(s[a].id)).error?p.error(m("Something went wrong, try again later."),{className:"!bg-error"}):(d(c=>c.filter((l,h)=>h!==a)),i.current&&(i.current.value=""))};return x.useEffect(()=>{r(s.map(({id:a})=>a))},[s]),x.useEffect(()=>()=>{s.length>0&&s.forEach(({id:a})=>{g.includes(a)||j(a)})},[]),e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex justify-between items-center mb-7",children:[e.jsx("h2",{className:"text-green600 font-semibold text-3xl",children:m("Add photos")}),e.jsxs("span",{className:"text-2xl text-white200",children:[s?s==null?void 0:s.length:0,"/5"]})]}),e.jsx("label",{htmlFor:"pictures",className:"w-full flex-1 grid grid-cols-2 auto-rows-[150px] mobile:auto-rows-[225px] gap-6",onDrop:a=>y(a),onDragOver:a=>a.preventDefault(),children:Array(5).fill(!1).map((a,t)=>e.jsx("div",{className:b("h-full mobile:col-span-2 relative group",t===0?"col-span-2 row-span-2 mobile:row-span-1":""),children:s[t]?e.jsxs(e.Fragment,{children:[e.jsx("img",{src:s[t].preview,alt:`Preview ${t}`,className:"rounded-lg object-cover w-full h-full",onClick:c=>c.preventDefault(),onError:()=>{p.error(m("Failed to load image."),{className:"!bg-error"}),f(t)}}),e.jsx("div",{onClick:c=>c.preventDefault(),className:"rounded-lg absolute inset-0 transition-all bg-[black]/40 invisible group-hover:visible opacity-0 group-hover:opacity-100 flex justify-center items-center",children:e.jsx(_,{onClick:()=>f(t),className:b("stroke-white100 mobile:size-12 cursor-pointer hover:scale-110 transition-all hover:stroke-soft-red",t===0?"size-14":"size-10")})})]}):e.jsx("div",{className:b("border-2 bg-green50 rounded-lg w-full h-full flex justify-center items-center cursor-pointer",t===0?"text-3xl mobile:text-2xl":"text-2xl",t===s.length?"border-dashed border-green600":"border-green400"),children:s.length===t?e.jsx("span",{className:"underline text-green600",children:m("Add photo")}):e.jsx(B,{})},t)},t))}),e.jsx("input",{ref:i,id:"pictures",name:"pictures",type:"file",multiple:!0,onChange:w,accept:"image/png, image/jpeg",className:"hidden"})]})},X={name:"Loading",color:null,state:null,wantedCategory:null,description:"",pictureIds:[]},Z=()=>{const{t:r}=S(),[g]=O(),{id:m}=T(),{data:n,refetch:j}=L(m),{data:s}=q(),{data:d}=M(),{errors:i,touched:u,handleBlur:w,values:y,handleChange:f,handleSubmit:a,setFieldValue:t}=W({initialValues:X,onSubmit:async()=>{try{(await g({id:n.id,name:c,description:N,color:l.value,state:parseInt(h.value),wantedCategory:v?v.map(({value:k})=>k):[],pictureIds:P})).error?p.error(r("Something went wrong, try again later."),{className:"!bg-error"}):p.success(r("Item changed successfully."),{className:"!bg-green100"}),j()}catch(o){p.error(JSON.stringify(o),{className:"!bg-error"})}},validationSchema:J}),{name:c,color:l,state:h,wantedCategory:v,description:N,pictureIds:P}=y;return x.useEffect(()=>{n&&(t("name",n.name),t("description",n.description),d&&t("color",I(d,r).find(({value:o})=>o===n.color)),t("state",E.find(({value:o})=>o==n.state)),s&&t("wantedCategory",R(s,r).filter(({value:o})=>n.wantedCategory.includes(o))),t("pictureIds",n.pictureIds))},[n,t,d,s,r]),e.jsxs(V,{children:[e.jsx(U,{to:z.HOME,children:r("return to Home page")}),e.jsx("h1",{className:"text-4xl font-semibold my-5",children:r("Edit Item")}),e.jsxs("form",{className:"space-y-5",onSubmit:a,children:[e.jsxs("div",{className:"flex below-998:flex-col gap-6",children:[e.jsxs(F,{className:"w-full space-y-6 p-8",children:[e.jsx(H,{label:e.jsxs(e.Fragment,{children:[r("item_name")," ",e.jsxs("span",{className:"text-green600 text-[14px]",children:["(",r("Required"),")"]})]}),placeholder:r("Enter the name of your item"),additionalBlock:r("Enter at least 10 characters"),charCounter:{withCharCounter:!0,maxChars:40},name:"name",type:"text",onChange:f,onBlur:w,value:c,error:u.name?i.name:void 0}),e.jsx(C,{label:e.jsxs(e.Fragment,{children:[r("Color")," ",e.jsxs("span",{className:"text-green600 text-[14px]",children:["(",r("Required"),")"]})]}),options:I(d,r),onChange:o=>t("color",o),value:l,error:u.color?i.color:void 0}),e.jsx(C,{label:e.jsxs(e.Fragment,{children:[r("Wanted category")," ",e.jsxs("span",{className:"text-green600 text-[14px]",children:["(",r("Optional"),")"]})]}),additionalBlock:r("All categories is chosen by default"),placeholder:r("All"),isMulti:!0,options:R(s,r),onChange:o=>t("wantedCategory",o),value:v,error:u.wantedCategory&&i.wantedCategory?i.wantedCategory[0]:void 0}),e.jsx(C,{label:e.jsxs(e.Fragment,{children:[r("State")," ",e.jsxs("span",{className:"text-green600 text-[14px]",children:["(",r("Required"),")"]})]}),options:E,onChange:o=>t("state",o),value:h,error:u.state?i.state:void 0}),e.jsx(G,{label:e.jsxs(e.Fragment,{children:[r("Description")," ",e.jsxs("span",{className:"text-green600 text-[14px]",children:["(",r("Required"),")"]})]}),placeholder:r("Describe your item"),additionalBlock:r("Enter at least 40 characters"),charCounter:{withCharCounter:!0,maxChars:500},name:"description",onChange:f,onBlur:w,value:N,error:u.description?i.description:void 0})]}),e.jsx(F,{className:b("w-full py-8 px-20 tablet:px-12 mobile:!px-8 flex flex-col",{"items-center justify-center":!n}),children:n?e.jsx(K,{setPicturesState:o=>t("pictureIds",o),pictureIds:n.pictureIds}):e.jsx($,{})})]}),e.jsx(Q,{className:"above-999:max-w-[300px] w-full",type:"submit",children:r("Change Item")})]})]})},de=Y(Z);export{de as default};
