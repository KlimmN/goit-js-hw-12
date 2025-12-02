import{a as f,S as m,i as n}from"./assets/vendor-Cq7ZUixy.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const g="53335895-4d104a908de65f21952c0d536",h="https://pixabay.com/api/";function y(a){return f.get(h,{params:{key:g,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(s=>s.data)}let l;const c=document.querySelector(".gallery"),u=document.querySelector(".loader");function L(a){const s=a.map(({webformatURL:r,largeImageURL:o,tags:e,likes:t,views:i,comments:p,downloads:d})=>`
        <li class="gallery-item">
          <a href="${o}">
            <img src="${r}" alt="${e}" />
          </a>
          <ul class="stats">
  <li class="stats-item">
    <span class="stats-label">Likes</span>
    <span class="stats-value">${t}</span>
  </li>
  <li class="stats-item">
    <span class="stats-label">Views</span>
    <span class="stats-value">${i}</span>
  </li>
  <li class="stats-item">
    <span class="stats-label">Comments</span>
    <span class="stats-value">${p}</span>
  </li>
  <li class="stats-item">
    <span class="stats-label">Downloads</span>
    <span class="stats-value">${d}</span>
  </li>
</ul>
</li>
    `).join("");c.insertAdjacentHTML("beforeend",s),l?l.refresh():l=new m(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250,captionPosition:"bottom"})}function b(){c.innerHTML=""}function q(){u.classList.remove("hidden")}function v(){u.classList.add("hidden")}const P=document.querySelector(".form");P.addEventListener("submit",a=>{a.preventDefault();const s=a.target.elements["search-text"].value.trim();if(!s){n.warning({message:"Please enter a search query",position:"topRight"});return}q(),b(),y(s).then(r=>{const{hits:o=[]}=r;if(o.length===0){n.error({message:"No images found. Try another query.",position:"topRight"});return}L(o)}).catch(r=>{n.error({message:"Request failed",position:"topRight"}),console.error(r)}).finally(()=>{v(),a.target.reset()})});
//# sourceMappingURL=index.js.map
