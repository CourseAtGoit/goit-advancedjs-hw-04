import{a as p,S as q,i as n}from"./assets/vendor-BmyeFVCx.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const B="https://pixabay.com/api/",w="18770359-69995c75016210012c9ceb955";p.defaults.baseURL=B;const y=async(t,r)=>(await p.get("/",{params:{key:w,q:t,page:r,per_page:15,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data,P=new q(".gallery a"),a={loaderEl:document.querySelector(".loader"),galleryEl:document.querySelector(".gallery"),loadMoreButton:document.querySelector(".load-more")},h=t=>{const r=t.map(({webformatURL:s,largeImageURL:l,tags:e,likes:o,views:i,comments:S,downloads:b})=>`
            <li class="gallery-item">
                <a href="${l}" class="gallery-link">
                    <img
                        class="gallery-image"
                        src="${s}"
                        alt="${e}"
                        width="360"
                        height="200"
                        loading="lazy"
                    />
                    <ul class ="info">
                        <li class="info-item">
                        <span class="info-item-title">Likes</span>
                        <span class="info-item-value">${o}</span>
                        </li>
                        <li class="info-item">
                        <span class="info-item-title">Views</span>
                        <span class="info-item-value">${i}</span>
                        </li>
                        <li class="info-item">
                        <span class="info-item-title">Comments</span>
                        <span class="info-item-value">${S}</span>
                        </li>
                        <li class="info-item">
                        <span class="info-item-title">Downloads</span>
                        <span class="info-item-value">${b}</span>
                        </li>
                    </ul>
                </a>
            </li>`).join("");a.galleryEl.insertAdjacentHTML("beforeend",r),P.refresh()},R=()=>{a.galleryEl.innerHTML=""},L=()=>{a.loaderEl.classList.add("active")},v=()=>{a.loaderEl.classList.remove("active")},E=t=>{a.loadMoreButton.classList.add("active"),a.loadMoreButton.addEventListener("click",t)},g=t=>{a.loadMoreButton.classList.remove("active"),a.loadMoreButton.removeEventListener("click",t)},f={formEl:document.querySelector(".form"),galleryEl:document.querySelector(".gallery"),loadMoreButton:document.querySelector(".load-more")};let c=1,u=null,M=null,m;const $=async t=>{t.preventDefault();const r=t.currentTarget;if(u=r.elements.search_text.value.trim(),!u){n.error({message:"Please enter a search query",position:"topRight"});return}R(),g(d),L(),c=1;try{const s=await y(u,c);if(s.hits.length===0){n.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}h(s.hits),m=Math.ceil(s.totalHits/15),m>1&&E(d),await f.galleryEl.querySelector(".gallery-image").decode(),M=f.galleryEl.querySelector("li").getBoundingClientRect().height}catch(s){console.error("Error fetching images:",s),n.error({message:"Failed to fetch images",position:"topRight"})}finally{v(),r.reset()}},d=async()=>{c+=1;try{g(d),L();const t=await y(u,c);m=Math.ceil(t.totalHits/15),h(t.hits),scrollBy({top:M*2,behavior:"smooth"}),E(d),c===m&&(g(),n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch(t){console.error("Error fetching images:",t),n.error({message:"Failed to fetch images",position:"topRight"})}finally{v()}};f.formEl.addEventListener("submit",$);
//# sourceMappingURL=index.js.map
