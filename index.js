import{a as w,S as R,i as n}from"./assets/vendor-DvfmeZXB.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const S="53335895-4d104a908de65f21952c0d536",B="https://pixabay.com/api/";async function p(o,s){return(await w.get(B,{params:{key:S,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:15}})).data}const f=document.querySelector(".gallery"),m=document.querySelector(".loader"),h=document.querySelector(".load-more"),E=new R(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250,captionPosition:"bottom"});function y(o){const s=o.map(({webformatURL:a,largeImageURL:r,tags:e,likes:t,views:l,comments:q,downloads:P})=>`
      <li class="gallery-item">
        <a href="${r}">
          <img src="${a}" alt="${e}" />
        </a>
        <ul class="stats">
          <li class="stats-item">
            <span class="stats-label">Likes</span>
            <span class="stats-value">${t}</span>
          </li>
          <li class="stats-item">
            <span class="stats-label">Views</span>
            <span class="stats-value">${l}</span>
          </li>
          <li class="stats-item">
            <span class="stats-label">Comments</span>
            <span class="stats-value">${q}</span>
          </li>
          <li class="stats-item">
            <span class="stats-label">Downloads</span>
            <span class="stats-value">${P}</span>
          </li>
        </ul>
      </li>
    `).join("");f.insertAdjacentHTML("beforeend",s),E.refresh()}function M(){f.innerHTML=""}function g(){m.classList.remove("hidden")}function L(){m.classList.add("hidden")}function b(){h.classList.remove("hidden")}function c(){h.classList.add("hidden")}const $=document.querySelector(".form"),O=document.querySelector(".load-more");let d="",i=1,u=0;const v=15;$.addEventListener("submit",x);O.addEventListener("click",A);async function x(o){o.preventDefault();const s=o.target.elements["search-text"].value.trim();if(!s){n.warning({message:"Please enter a search query",position:"topRight"});return}d=s,i=1,M(),c(),g();try{const a=await p(d,i),{hits:r=[],totalHits:e=0}=a;if(u=e,!r.length){n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}y(r),i*v<u?b():(c(),n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),o.target.reset()}catch(a){n.error({message:"Request failed. Please try again later.",position:"topRight"}),console.error(a)}finally{L()}}async function A(){i+=1,g(),c();try{const o=await p(d,i),{hits:s=[]}=o;if(!s.length){c(),n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}const a=document.querySelector(".gallery-item");let r=0;a&&(r=a.getBoundingClientRect().height),y(s),r&&window.scrollBy({top:r*2,behavior:"smooth"}),i*v>=u?(c(),n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):b()}catch(o){n.error({message:"Request failed. Please try again later.",position:"topRight"}),console.error(o)}finally{L()}}
//# sourceMappingURL=index.js.map
