import{r as m,j as e,c as a}from"./index-nxJALUib.js";const b=({label:l,name:s,error:x,additionalBlock:i,charCounter:t,className:h,onChange:r,inputClassName:d,...o})=>{const[n,c]=m.useState(0);return e.jsxs("div",{className:a("flex flex-col w-full gap-1 relative",h),children:[l&&e.jsx("label",{className:"text-[16px]",htmlFor:s,children:l}),e.jsxs("div",{className:"relative h-full",children:[e.jsx("textarea",{...o,rows:5,id:s,name:s,className:a("max-h-[320px] w-full text-[16px] min-h-[40px] pt-2 pb-1 rounded-lg hover:brightness-[98%] border border-white200 bg-white50 px-3 focus:border-orange400 focus-visible:outline-none",d),onChange:p=>{c(p.target.value.length),r&&r(p)}}),(t==null?void 0:t.withCharCounter)&&e.jsxs("div",{className:a("absolute right-0 bottom-[-12px] text-[12px]",n>t.maxChars?"text-[red]":"text-white400"),children:[n,"/",t.maxChars]})]}),i&&e.jsx("span",{className:"text-white400 text-[12px] leading-none -mt-1.5",children:i}),x&&e.jsx("span",{className:"text-[red] text-[12px] leading-none",children:x.charAt(0).toUpperCase()+x.slice(1)})]})};export{b as T};
