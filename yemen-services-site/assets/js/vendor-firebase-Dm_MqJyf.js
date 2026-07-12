import{o as ph,R as qi}from"./vendor-others-CzZUzLlP.js";const gh=()=>{};var ka={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ou=function(n){const t=[];let e=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},_h=function(n){const t=[];let e=0,r=0;for(;e<n.length;){const s=n[e++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){const o=n[e++];t[r++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=n[e++],a=n[e++],c=n[e++],h=((s&7)<<18|(o&63)<<12|(a&63)<<6|c&63)-65536;t[r++]=String.fromCharCode(55296+(h>>10)),t[r++]=String.fromCharCode(56320+(h&1023))}else{const o=n[e++],a=n[e++];t[r++]=String.fromCharCode((s&15)<<12|(o&63)<<6|a&63)}}return t.join("")},Lu={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const o=n[s],a=s+1<n.length,c=a?n[s+1]:0,h=s+2<n.length,f=h?n[s+2]:0,m=o>>2,p=(o&3)<<4|c>>4;let V=(c&15)<<2|f>>6,C=f&63;h||(C=64,a||(V=64)),r.push(e[m],e[p],e[V],e[C])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(Ou(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):_h(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const o=e[n.charAt(s++)],c=s<n.length?e[n.charAt(s)]:0;++s;const f=s<n.length?e[n.charAt(s)]:64;++s;const p=s<n.length?e[n.charAt(s)]:64;if(++s,o==null||c==null||f==null||p==null)throw new yh;const V=o<<2|c>>4;if(r.push(V),f!==64){const C=c<<4&240|f>>2;if(r.push(C),p!==64){const x=f<<6&192|p;r.push(x)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class yh extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Eh=function(n){const t=Ou(n);return Lu.encodeByteArray(t,!0)},ss=function(n){return Eh(n).replace(/\./g,"")},Th=function(n){try{return Lu.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vh(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wh=()=>vh().__FIREBASE_DEFAULTS__,Ih=()=>{if(typeof process>"u"||typeof ka>"u")return;const n=ka.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Ah=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&Th(n[1]);return t&&JSON.parse(t)},ji=()=>{try{return gh()||wh()||Ih()||Ah()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Vh=n=>{var t,e;return(e=(t=ji())==null?void 0:t.emulatorHosts)==null?void 0:e[n]},Rh=n=>{const t=Vh(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),r]:[t.substring(0,e),r]},Mu=()=>{var n;return(n=ji())==null?void 0:n.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ph{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sh(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},r=t||"demo-project",s=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}},...n};return[ss(JSON.stringify(e)),ss(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ch(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function bh(){var t;const n=(t=ji())==null?void 0:t.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function xh(){return!bh()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Dh(){try{return typeof indexedDB=="object"}catch{return!1}}function Nh(){return new Promise((n,t)=>{try{let e=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{var o;t(((o=s.error)==null?void 0:o.message)||"")}}catch(e){t(e)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kh="FirebaseError";class yn extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=kh,Object.setPrototypeOf(this,yn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Uu.prototype.create)}}class Uu{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){const r=e[0]||{},s=`${this.service}/${t}`,o=this.errors[t],a=o?Oh(o,r):"Error",c=`${this.serviceName}: ${a} (${s}).`;return new yn(s,c,r)}}function Oh(n,t){return n.replace(Lh,(e,r)=>{const s=t[r];return s!=null?String(s):`<${r}?>`})}const Lh=/\{\$([^}]+)}/g;function is(n,t){if(n===t)return!0;const e=Object.keys(n),r=Object.keys(t);for(const s of e){if(!r.includes(s))return!1;const o=n[s],a=t[s];if(Oa(o)&&Oa(a)){if(!is(o,a))return!1}else if(o!==a)return!1}for(const s of r)if(!e.includes(s))return!1;return!0}function Oa(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ln(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fu(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Mh(n){return(await fetch(n,{credentials:"include"})).ok}class nr{constructor(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Be="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uh{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const r=new Ph;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){const e=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),r=(t==null?void 0:t.optional)??!1;if(this.isInitialized(e)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:e})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(Bh(t))try{this.getOrInitializeService({instanceIdentifier:Be})}catch{}for(const[e,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const o=this.getOrInitializeService({instanceIdentifier:s});r.resolve(o)}catch{}}}}clearInstance(t=Be){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=Be){return this.instances.has(t)}getOptions(t=Be){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:e});for(const[o,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(o);r===c&&a.resolve(s)}return s}onInit(t,e){const r=this.normalizeInstanceIdentifier(e),s=this.onInitCallbacks.get(r)??new Set;s.add(t),this.onInitCallbacks.set(r,s);const o=this.instances.get(r);return o&&t(o,r),()=>{s.delete(t)}}invokeOnInitCallbacks(t,e){const r=this.onInitCallbacks.get(e);if(r)for(const s of r)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Fh(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=Be){return this.component?this.component.multipleInstances?t:Be:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Fh(n){return n===Be?void 0:n}function Bh(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $h{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new Uh(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var W;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(W||(W={}));const qh={debug:W.DEBUG,verbose:W.VERBOSE,info:W.INFO,warn:W.WARN,error:W.ERROR,silent:W.SILENT},jh=W.INFO,zh={[W.DEBUG]:"log",[W.VERBOSE]:"log",[W.INFO]:"info",[W.WARN]:"warn",[W.ERROR]:"error"},Gh=(n,t,...e)=>{if(t<n.logLevel)return;const r=new Date().toISOString(),s=zh[t];if(s)console[s](`[${r}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class Bu{constructor(t){this.name=t,this._logLevel=jh,this._logHandler=Gh,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in W))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?qh[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,W.DEBUG,...t),this._logHandler(this,W.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,W.VERBOSE,...t),this._logHandler(this,W.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,W.INFO,...t),this._logHandler(this,W.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,W.WARN,...t),this._logHandler(this,W.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,W.ERROR,...t),this._logHandler(this,W.ERROR,...t)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hh{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(Qh(e)){const r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}}function Qh(n){const t=n.getComponent();return(t==null?void 0:t.type)==="VERSION"}const vi="@firebase/app",La="0.15.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ce=new Bu("@firebase/app"),Kh="@firebase/app-compat",Wh="@firebase/analytics-compat",Yh="@firebase/analytics",Jh="@firebase/app-check-compat",Xh="@firebase/app-check",Zh="@firebase/auth",tf="@firebase/auth-compat",ef="@firebase/database",nf="@firebase/data-connect",rf="@firebase/database-compat",sf="@firebase/functions",of="@firebase/functions-compat",af="@firebase/installations",uf="@firebase/installations-compat",cf="@firebase/messaging",lf="@firebase/messaging-compat",hf="@firebase/performance",ff="@firebase/performance-compat",df="@firebase/remote-config",mf="@firebase/remote-config-compat",pf="@firebase/storage",gf="@firebase/storage-compat",_f="@firebase/firestore",yf="@firebase/ai",Ef="@firebase/firestore-compat",Tf="firebase",vf="12.15.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wi="[DEFAULT]",wf={[vi]:"fire-core",[Kh]:"fire-core-compat",[Yh]:"fire-analytics",[Wh]:"fire-analytics-compat",[Xh]:"fire-app-check",[Jh]:"fire-app-check-compat",[Zh]:"fire-auth",[tf]:"fire-auth-compat",[ef]:"fire-rtdb",[nf]:"fire-data-connect",[rf]:"fire-rtdb-compat",[sf]:"fire-fn",[of]:"fire-fn-compat",[af]:"fire-iid",[uf]:"fire-iid-compat",[cf]:"fire-fcm",[lf]:"fire-fcm-compat",[hf]:"fire-perf",[ff]:"fire-perf-compat",[df]:"fire-rc",[mf]:"fire-rc-compat",[pf]:"fire-gcs",[gf]:"fire-gcs-compat",[_f]:"fire-fst",[Ef]:"fire-fst-compat",[yf]:"fire-vertex","fire-js":"fire-js",[Tf]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rr=new Map,If=new Map,Ii=new Map;function Ma(n,t){try{n.container.addComponent(t)}catch(e){ce.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function os(n){const t=n.name;if(Ii.has(t))return ce.debug(`There were multiple attempts to register component ${t}.`),!1;Ii.set(t,n);for(const e of rr.values())Ma(e,n);for(const e of If.values())Ma(e,n);return!0}function Af(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function Vf(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rf={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ee=new Uu("app","Firebase",Rf);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pf{constructor(t,e,r){this._isDeleted=!1,this._options={...t},this._config={...e},this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new nr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Ee.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sf=vf;function Cf(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const r={name:wi,automaticDataCollectionEnabled:!0,...t},s=r.name;if(typeof s!="string"||!s)throw Ee.create("bad-app-name",{appName:String(s)});if(e||(e=Mu()),!e)throw Ee.create("no-options");const o=rr.get(s);if(o){if(is(e,o.options)&&is(r,o.config))return o;throw Ee.create("duplicate-app",{appName:s})}const a=new $h(s);for(const h of Ii.values())a.addComponent(h);const c=new Pf(e,r,a);return rr.set(s,c),c}function bf(n=wi){const t=rr.get(n);if(!t&&n===wi&&Mu())return Cf();if(!t)throw Ee.create("no-app",{appName:n});return t}function F_(){return Array.from(rr.values())}function un(n,t,e){let r=wf[n]??n;e&&(r+=`-${e}`);const s=r.match(/\s|\//),o=t.match(/\s|\//);if(s||o){const a=[`Unable to register library "${r}" with version "${t}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${t}" contains illegal characters (whitespace or "/")`),ce.warn(a.join(" "));return}os(new nr(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xf="firebase-heartbeat-database",Df=1,sr="firebase-heartbeat-store";let di=null;function $u(){return di||(di=ph(xf,Df,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(sr)}catch(e){console.warn(e)}}}}).catch(n=>{throw Ee.create("idb-open",{originalErrorMessage:n.message})})),di}async function Nf(n){try{const e=(await $u()).transaction(sr),r=await e.objectStore(sr).get(qu(n));return await e.done,r}catch(t){if(t instanceof yn)ce.warn(t.message);else{const e=Ee.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});ce.warn(e.message)}}}async function Ua(n,t){try{const r=(await $u()).transaction(sr,"readwrite");await r.objectStore(sr).put(t,qu(n)),await r.done}catch(e){if(e instanceof yn)ce.warn(e.message);else{const r=Ee.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});ce.warn(r.message)}}}function qu(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kf=1024,Of=30;class Lf{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new Uf(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,e;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=Fa();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats.length>Of){const a=Ff(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){ce.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Fa(),{heartbeatsToSend:r,unsentEntries:s}=Mf(this._heartbeatsCache.heartbeats),o=ss(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(e){return ce.warn(e),""}}}function Fa(){return new Date().toISOString().substring(0,10)}function Mf(n,t=kf){const e=[];let r=n.slice();for(const s of n){const o=e.find(a=>a.agent===s.agent);if(o){if(o.dates.push(s.date),Ba(e)>t){o.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),Ba(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}class Uf{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Dh()?Nh().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await Nf(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return Ua(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return Ua(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...t.heartbeats]})}else return}}function Ba(n){return ss(JSON.stringify({version:2,heartbeats:n})).length}function Ff(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let r=1;r<n.length;r++)n[r].date<e&&(e=n[r].date,t=r);return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bf(n){os(new nr("platform-logger",t=>new Hh(t),"PRIVATE")),os(new nr("heartbeat",t=>new Lf(t),"PRIVATE")),un(vi,La,n),un(vi,La,"esm2020"),un("fire-js","")}Bf("");var $a=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Te,ju;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(v,g){function y(){}y.prototype=g.prototype,v.F=g.prototype,v.prototype=new y,v.prototype.constructor=v,v.D=function(w,T,A){for(var _=Array(arguments.length-2),bt=2;bt<arguments.length;bt++)_[bt-2]=arguments[bt];return g.prototype[T].apply(w,_)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(r,e),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(v,g,y){y||(y=0);const w=Array(16);if(typeof g=="string")for(var T=0;T<16;++T)w[T]=g.charCodeAt(y++)|g.charCodeAt(y++)<<8|g.charCodeAt(y++)<<16|g.charCodeAt(y++)<<24;else for(T=0;T<16;++T)w[T]=g[y++]|g[y++]<<8|g[y++]<<16|g[y++]<<24;g=v.g[0],y=v.g[1],T=v.g[2];let A=v.g[3],_;_=g+(A^y&(T^A))+w[0]+3614090360&4294967295,g=y+(_<<7&4294967295|_>>>25),_=A+(T^g&(y^T))+w[1]+3905402710&4294967295,A=g+(_<<12&4294967295|_>>>20),_=T+(y^A&(g^y))+w[2]+606105819&4294967295,T=A+(_<<17&4294967295|_>>>15),_=y+(g^T&(A^g))+w[3]+3250441966&4294967295,y=T+(_<<22&4294967295|_>>>10),_=g+(A^y&(T^A))+w[4]+4118548399&4294967295,g=y+(_<<7&4294967295|_>>>25),_=A+(T^g&(y^T))+w[5]+1200080426&4294967295,A=g+(_<<12&4294967295|_>>>20),_=T+(y^A&(g^y))+w[6]+2821735955&4294967295,T=A+(_<<17&4294967295|_>>>15),_=y+(g^T&(A^g))+w[7]+4249261313&4294967295,y=T+(_<<22&4294967295|_>>>10),_=g+(A^y&(T^A))+w[8]+1770035416&4294967295,g=y+(_<<7&4294967295|_>>>25),_=A+(T^g&(y^T))+w[9]+2336552879&4294967295,A=g+(_<<12&4294967295|_>>>20),_=T+(y^A&(g^y))+w[10]+4294925233&4294967295,T=A+(_<<17&4294967295|_>>>15),_=y+(g^T&(A^g))+w[11]+2304563134&4294967295,y=T+(_<<22&4294967295|_>>>10),_=g+(A^y&(T^A))+w[12]+1804603682&4294967295,g=y+(_<<7&4294967295|_>>>25),_=A+(T^g&(y^T))+w[13]+4254626195&4294967295,A=g+(_<<12&4294967295|_>>>20),_=T+(y^A&(g^y))+w[14]+2792965006&4294967295,T=A+(_<<17&4294967295|_>>>15),_=y+(g^T&(A^g))+w[15]+1236535329&4294967295,y=T+(_<<22&4294967295|_>>>10),_=g+(T^A&(y^T))+w[1]+4129170786&4294967295,g=y+(_<<5&4294967295|_>>>27),_=A+(y^T&(g^y))+w[6]+3225465664&4294967295,A=g+(_<<9&4294967295|_>>>23),_=T+(g^y&(A^g))+w[11]+643717713&4294967295,T=A+(_<<14&4294967295|_>>>18),_=y+(A^g&(T^A))+w[0]+3921069994&4294967295,y=T+(_<<20&4294967295|_>>>12),_=g+(T^A&(y^T))+w[5]+3593408605&4294967295,g=y+(_<<5&4294967295|_>>>27),_=A+(y^T&(g^y))+w[10]+38016083&4294967295,A=g+(_<<9&4294967295|_>>>23),_=T+(g^y&(A^g))+w[15]+3634488961&4294967295,T=A+(_<<14&4294967295|_>>>18),_=y+(A^g&(T^A))+w[4]+3889429448&4294967295,y=T+(_<<20&4294967295|_>>>12),_=g+(T^A&(y^T))+w[9]+568446438&4294967295,g=y+(_<<5&4294967295|_>>>27),_=A+(y^T&(g^y))+w[14]+3275163606&4294967295,A=g+(_<<9&4294967295|_>>>23),_=T+(g^y&(A^g))+w[3]+4107603335&4294967295,T=A+(_<<14&4294967295|_>>>18),_=y+(A^g&(T^A))+w[8]+1163531501&4294967295,y=T+(_<<20&4294967295|_>>>12),_=g+(T^A&(y^T))+w[13]+2850285829&4294967295,g=y+(_<<5&4294967295|_>>>27),_=A+(y^T&(g^y))+w[2]+4243563512&4294967295,A=g+(_<<9&4294967295|_>>>23),_=T+(g^y&(A^g))+w[7]+1735328473&4294967295,T=A+(_<<14&4294967295|_>>>18),_=y+(A^g&(T^A))+w[12]+2368359562&4294967295,y=T+(_<<20&4294967295|_>>>12),_=g+(y^T^A)+w[5]+4294588738&4294967295,g=y+(_<<4&4294967295|_>>>28),_=A+(g^y^T)+w[8]+2272392833&4294967295,A=g+(_<<11&4294967295|_>>>21),_=T+(A^g^y)+w[11]+1839030562&4294967295,T=A+(_<<16&4294967295|_>>>16),_=y+(T^A^g)+w[14]+4259657740&4294967295,y=T+(_<<23&4294967295|_>>>9),_=g+(y^T^A)+w[1]+2763975236&4294967295,g=y+(_<<4&4294967295|_>>>28),_=A+(g^y^T)+w[4]+1272893353&4294967295,A=g+(_<<11&4294967295|_>>>21),_=T+(A^g^y)+w[7]+4139469664&4294967295,T=A+(_<<16&4294967295|_>>>16),_=y+(T^A^g)+w[10]+3200236656&4294967295,y=T+(_<<23&4294967295|_>>>9),_=g+(y^T^A)+w[13]+681279174&4294967295,g=y+(_<<4&4294967295|_>>>28),_=A+(g^y^T)+w[0]+3936430074&4294967295,A=g+(_<<11&4294967295|_>>>21),_=T+(A^g^y)+w[3]+3572445317&4294967295,T=A+(_<<16&4294967295|_>>>16),_=y+(T^A^g)+w[6]+76029189&4294967295,y=T+(_<<23&4294967295|_>>>9),_=g+(y^T^A)+w[9]+3654602809&4294967295,g=y+(_<<4&4294967295|_>>>28),_=A+(g^y^T)+w[12]+3873151461&4294967295,A=g+(_<<11&4294967295|_>>>21),_=T+(A^g^y)+w[15]+530742520&4294967295,T=A+(_<<16&4294967295|_>>>16),_=y+(T^A^g)+w[2]+3299628645&4294967295,y=T+(_<<23&4294967295|_>>>9),_=g+(T^(y|~A))+w[0]+4096336452&4294967295,g=y+(_<<6&4294967295|_>>>26),_=A+(y^(g|~T))+w[7]+1126891415&4294967295,A=g+(_<<10&4294967295|_>>>22),_=T+(g^(A|~y))+w[14]+2878612391&4294967295,T=A+(_<<15&4294967295|_>>>17),_=y+(A^(T|~g))+w[5]+4237533241&4294967295,y=T+(_<<21&4294967295|_>>>11),_=g+(T^(y|~A))+w[12]+1700485571&4294967295,g=y+(_<<6&4294967295|_>>>26),_=A+(y^(g|~T))+w[3]+2399980690&4294967295,A=g+(_<<10&4294967295|_>>>22),_=T+(g^(A|~y))+w[10]+4293915773&4294967295,T=A+(_<<15&4294967295|_>>>17),_=y+(A^(T|~g))+w[1]+2240044497&4294967295,y=T+(_<<21&4294967295|_>>>11),_=g+(T^(y|~A))+w[8]+1873313359&4294967295,g=y+(_<<6&4294967295|_>>>26),_=A+(y^(g|~T))+w[15]+4264355552&4294967295,A=g+(_<<10&4294967295|_>>>22),_=T+(g^(A|~y))+w[6]+2734768916&4294967295,T=A+(_<<15&4294967295|_>>>17),_=y+(A^(T|~g))+w[13]+1309151649&4294967295,y=T+(_<<21&4294967295|_>>>11),_=g+(T^(y|~A))+w[4]+4149444226&4294967295,g=y+(_<<6&4294967295|_>>>26),_=A+(y^(g|~T))+w[11]+3174756917&4294967295,A=g+(_<<10&4294967295|_>>>22),_=T+(g^(A|~y))+w[2]+718787259&4294967295,T=A+(_<<15&4294967295|_>>>17),_=y+(A^(T|~g))+w[9]+3951481745&4294967295,v.g[0]=v.g[0]+g&4294967295,v.g[1]=v.g[1]+(T+(_<<21&4294967295|_>>>11))&4294967295,v.g[2]=v.g[2]+T&4294967295,v.g[3]=v.g[3]+A&4294967295}r.prototype.v=function(v,g){g===void 0&&(g=v.length);const y=g-this.blockSize,w=this.C;let T=this.h,A=0;for(;A<g;){if(T==0)for(;A<=y;)s(this,v,A),A+=this.blockSize;if(typeof v=="string"){for(;A<g;)if(w[T++]=v.charCodeAt(A++),T==this.blockSize){s(this,w),T=0;break}}else for(;A<g;)if(w[T++]=v[A++],T==this.blockSize){s(this,w),T=0;break}}this.h=T,this.o+=g},r.prototype.A=function(){var v=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);v[0]=128;for(var g=1;g<v.length-8;++g)v[g]=0;g=this.o*8;for(var y=v.length-8;y<v.length;++y)v[y]=g&255,g/=256;for(this.v(v),v=Array(16),g=0,y=0;y<4;++y)for(let w=0;w<32;w+=8)v[g++]=this.g[y]>>>w&255;return v};function o(v,g){var y=c;return Object.prototype.hasOwnProperty.call(y,v)?y[v]:y[v]=g(v)}function a(v,g){this.h=g;const y=[];let w=!0;for(let T=v.length-1;T>=0;T--){const A=v[T]|0;w&&A==g||(y[T]=A,w=!1)}this.g=y}var c={};function h(v){return-128<=v&&v<128?o(v,function(g){return new a([g|0],g<0?-1:0)}):new a([v|0],v<0?-1:0)}function f(v){if(isNaN(v)||!isFinite(v))return p;if(v<0)return L(f(-v));const g=[];let y=1;for(let w=0;v>=y;w++)g[w]=v/y|0,y*=4294967296;return new a(g,0)}function m(v,g){if(v.length==0)throw Error("number format error: empty string");if(g=g||10,g<2||36<g)throw Error("radix out of range: "+g);if(v.charAt(0)=="-")return L(m(v.substring(1),g));if(v.indexOf("-")>=0)throw Error('number format error: interior "-" character');const y=f(Math.pow(g,8));let w=p;for(let A=0;A<v.length;A+=8){var T=Math.min(8,v.length-A);const _=parseInt(v.substring(A,A+T),g);T<8?(T=f(Math.pow(g,T)),w=w.j(T).add(f(_))):(w=w.j(y),w=w.add(f(_)))}return w}var p=h(0),V=h(1),C=h(16777216);n=a.prototype,n.m=function(){if(B(this))return-L(this).m();let v=0,g=1;for(let y=0;y<this.g.length;y++){const w=this.i(y);v+=(w>=0?w:4294967296+w)*g,g*=4294967296}return v},n.toString=function(v){if(v=v||10,v<2||36<v)throw Error("radix out of range: "+v);if(x(this))return"0";if(B(this))return"-"+L(this).toString(v);const g=f(Math.pow(v,6));var y=this;let w="";for(;;){const T=qt(y,g).g;y=Q(y,T.j(g));let A=((y.g.length>0?y.g[0]:y.h)>>>0).toString(v);if(y=T,x(y))return A+w;for(;A.length<6;)A="0"+A;w=A+w}},n.i=function(v){return v<0?0:v<this.g.length?this.g[v]:this.h};function x(v){if(v.h!=0)return!1;for(let g=0;g<v.g.length;g++)if(v.g[g]!=0)return!1;return!0}function B(v){return v.h==-1}n.l=function(v){return v=Q(this,v),B(v)?-1:x(v)?0:1};function L(v){const g=v.g.length,y=[];for(let w=0;w<g;w++)y[w]=~v.g[w];return new a(y,~v.h).add(V)}n.abs=function(){return B(this)?L(this):this},n.add=function(v){const g=Math.max(this.g.length,v.g.length),y=[];let w=0;for(let T=0;T<=g;T++){let A=w+(this.i(T)&65535)+(v.i(T)&65535),_=(A>>>16)+(this.i(T)>>>16)+(v.i(T)>>>16);w=_>>>16,A&=65535,_&=65535,y[T]=_<<16|A}return new a(y,y[y.length-1]&-2147483648?-1:0)};function Q(v,g){return v.add(L(g))}n.j=function(v){if(x(this)||x(v))return p;if(B(this))return B(v)?L(this).j(L(v)):L(L(this).j(v));if(B(v))return L(this.j(L(v)));if(this.l(C)<0&&v.l(C)<0)return f(this.m()*v.m());const g=this.g.length+v.g.length,y=[];for(var w=0;w<2*g;w++)y[w]=0;for(w=0;w<this.g.length;w++)for(let T=0;T<v.g.length;T++){const A=this.i(w)>>>16,_=this.i(w)&65535,bt=v.i(T)>>>16,ke=v.i(T)&65535;y[2*w+2*T]+=_*ke,J(y,2*w+2*T),y[2*w+2*T+1]+=A*ke,J(y,2*w+2*T+1),y[2*w+2*T+1]+=_*bt,J(y,2*w+2*T+1),y[2*w+2*T+2]+=A*bt,J(y,2*w+2*T+2)}for(v=0;v<g;v++)y[v]=y[2*v+1]<<16|y[2*v];for(v=g;v<2*g;v++)y[v]=0;return new a(y,0)};function J(v,g){for(;(v[g]&65535)!=v[g];)v[g+1]+=v[g]>>>16,v[g]&=65535,g++}function rt(v,g){this.g=v,this.h=g}function qt(v,g){if(x(g))throw Error("division by zero");if(x(v))return new rt(p,p);if(B(v))return g=qt(L(v),g),new rt(L(g.g),L(g.h));if(B(g))return g=qt(v,L(g)),new rt(L(g.g),g.h);if(v.g.length>30){if(B(v)||B(g))throw Error("slowDivide_ only works with positive integers.");for(var y=V,w=g;w.l(v)<=0;)y=Tt(y),w=Tt(w);var T=vt(y,1),A=vt(w,1);for(w=vt(w,2),y=vt(y,2);!x(w);){var _=A.add(w);_.l(v)<=0&&(T=T.add(y),A=_),w=vt(w,1),y=vt(y,1)}return g=Q(v,T.j(g)),new rt(T,g)}for(T=p;v.l(g)>=0;){for(y=Math.max(1,Math.floor(v.m()/g.m())),w=Math.ceil(Math.log(y)/Math.LN2),w=w<=48?1:Math.pow(2,w-48),A=f(y),_=A.j(g);B(_)||_.l(v)>0;)y-=w,A=f(y),_=A.j(g);x(A)&&(A=V),T=T.add(A),v=Q(v,_)}return new rt(T,v)}n.B=function(v){return qt(this,v).h},n.and=function(v){const g=Math.max(this.g.length,v.g.length),y=[];for(let w=0;w<g;w++)y[w]=this.i(w)&v.i(w);return new a(y,this.h&v.h)},n.or=function(v){const g=Math.max(this.g.length,v.g.length),y=[];for(let w=0;w<g;w++)y[w]=this.i(w)|v.i(w);return new a(y,this.h|v.h)},n.xor=function(v){const g=Math.max(this.g.length,v.g.length),y=[];for(let w=0;w<g;w++)y[w]=this.i(w)^v.i(w);return new a(y,this.h^v.h)};function Tt(v){const g=v.g.length+1,y=[];for(let w=0;w<g;w++)y[w]=v.i(w)<<1|v.i(w-1)>>>31;return new a(y,v.h)}function vt(v,g){const y=g>>5;g%=32;const w=v.g.length-y,T=[];for(let A=0;A<w;A++)T[A]=g>0?v.i(A+y)>>>g|v.i(A+y+1)<<32-g:v.i(A+y);return new a(T,v.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,ju=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=f,a.fromString=m,Te=a}).apply(typeof $a<"u"?$a:typeof self<"u"?self:typeof window<"u"?window:{});var Gr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var zu,Gn,Gu,Jr,Ai,Hu,Qu,Ku;(function(){var n,t=Object.defineProperty;function e(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof Gr=="object"&&Gr];for(var u=0;u<i.length;++u){var l=i[u];if(l&&l.Math==Math)return l}throw Error("Cannot find global object")}var r=e(this);function s(i,u){if(u)t:{var l=r;i=i.split(".");for(var d=0;d<i.length-1;d++){var I=i[d];if(!(I in l))break t;l=l[I]}i=i[i.length-1],d=l[i],u=u(d),u!=d&&u!=null&&t(l,i,{configurable:!0,writable:!0,value:u})}}s("Symbol.dispose",function(i){return i||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(i){return i||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(i){return i||function(u){var l=[],d;for(d in u)Object.prototype.hasOwnProperty.call(u,d)&&l.push([d,u[d]]);return l}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},a=this||self;function c(i){var u=typeof i;return u=="object"&&i!=null||u=="function"}function h(i,u,l){return i.call.apply(i.bind,arguments)}function f(i,u,l){return f=h,f.apply(null,arguments)}function m(i,u){var l=Array.prototype.slice.call(arguments,1);return function(){var d=l.slice();return d.push.apply(d,arguments),i.apply(this,d)}}function p(i,u){function l(){}l.prototype=u.prototype,i.Z=u.prototype,i.prototype=new l,i.prototype.constructor=i,i.Ob=function(d,I,R){for(var N=Array(arguments.length-2),z=2;z<arguments.length;z++)N[z-2]=arguments[z];return u.prototype[I].apply(d,N)}}var V=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?i=>i&&AsyncContext.Snapshot.wrap(i):i=>i;function C(i){const u=i.length;if(u>0){const l=Array(u);for(let d=0;d<u;d++)l[d]=i[d];return l}return[]}function x(i,u){for(let d=1;d<arguments.length;d++){const I=arguments[d];var l=typeof I;if(l=l!="object"?l:I?Array.isArray(I)?"array":l:"null",l=="array"||l=="object"&&typeof I.length=="number"){l=i.length||0;const R=I.length||0;i.length=l+R;for(let N=0;N<R;N++)i[l+N]=I[N]}else i.push(I)}}class B{constructor(u,l){this.i=u,this.j=l,this.h=0,this.g=null}get(){let u;return this.h>0?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function L(i){a.setTimeout(()=>{throw i},0)}function Q(){var i=v;let u=null;return i.g&&(u=i.g,i.g=i.g.next,i.g||(i.h=null),u.next=null),u}class J{constructor(){this.h=this.g=null}add(u,l){const d=rt.get();d.set(u,l),this.h?this.h.next=d:this.g=d,this.h=d}}var rt=new B(()=>new qt,i=>i.reset());class qt{constructor(){this.next=this.g=this.h=null}set(u,l){this.h=u,this.g=l,this.next=null}reset(){this.next=this.g=this.h=null}}let Tt,vt=!1,v=new J,g=()=>{const i=Promise.resolve(void 0);Tt=()=>{i.then(y)}};function y(){for(var i;i=Q();){try{i.h.call(i.g)}catch(l){L(l)}var u=rt;u.j(i),u.h<100&&(u.h++,i.next=u.g,u.g=i)}vt=!1}function w(){this.u=this.u,this.C=this.C}w.prototype.u=!1,w.prototype.dispose=function(){this.u||(this.u=!0,this.N())},w.prototype[Symbol.dispose]=function(){this.dispose()},w.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function T(i,u){this.type=i,this.g=this.target=u,this.defaultPrevented=!1}T.prototype.h=function(){this.defaultPrevented=!0};var A=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var i=!1,u=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const l=()=>{};a.addEventListener("test",l,u),a.removeEventListener("test",l,u)}catch{}return i})();function _(i){return/^[\s\xa0]*$/.test(i)}function bt(i,u){T.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i&&this.init(i,u)}p(bt,T),bt.prototype.init=function(i,u){const l=this.type=i.type,d=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;this.target=i.target||i.srcElement,this.g=u,u=i.relatedTarget,u||(l=="mouseover"?u=i.fromElement:l=="mouseout"&&(u=i.toElement)),this.relatedTarget=u,d?(this.clientX=d.clientX!==void 0?d.clientX:d.pageX,this.clientY=d.clientY!==void 0?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=i.pointerType,this.state=i.state,this.i=i,i.defaultPrevented&&bt.Z.h.call(this)},bt.prototype.h=function(){bt.Z.h.call(this);const i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var ke="closure_listenable_"+(Math.random()*1e6|0),Ml=0;function Ul(i,u,l,d,I){this.listener=i,this.proxy=null,this.src=u,this.type=l,this.capture=!!d,this.ha=I,this.key=++Ml,this.da=this.fa=!1}function br(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function xr(i,u,l){for(const d in i)u.call(l,i[d],d,i)}function Fl(i,u){for(const l in i)u.call(void 0,i[l],l,i)}function No(i){const u={};for(const l in i)u[l]=i[l];return u}const ko="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Oo(i,u){let l,d;for(let I=1;I<arguments.length;I++){d=arguments[I];for(l in d)i[l]=d[l];for(let R=0;R<ko.length;R++)l=ko[R],Object.prototype.hasOwnProperty.call(d,l)&&(i[l]=d[l])}}function Dr(i){this.src=i,this.g={},this.h=0}Dr.prototype.add=function(i,u,l,d,I){const R=i.toString();i=this.g[R],i||(i=this.g[R]=[],this.h++);const N=zs(i,u,d,I);return N>-1?(u=i[N],l||(u.fa=!1)):(u=new Ul(u,this.src,R,!!d,I),u.fa=l,i.push(u)),u};function js(i,u){const l=u.type;if(l in i.g){var d=i.g[l],I=Array.prototype.indexOf.call(d,u,void 0),R;(R=I>=0)&&Array.prototype.splice.call(d,I,1),R&&(br(u),i.g[l].length==0&&(delete i.g[l],i.h--))}}function zs(i,u,l,d){for(let I=0;I<i.length;++I){const R=i[I];if(!R.da&&R.listener==u&&R.capture==!!l&&R.ha==d)return I}return-1}var Gs="closure_lm_"+(Math.random()*1e6|0),Hs={};function Lo(i,u,l,d,I){if(Array.isArray(u)){for(let R=0;R<u.length;R++)Lo(i,u[R],l,d,I);return null}return l=Fo(l),i&&i[ke]?i.J(u,l,c(d)?!!d.capture:!1,I):Bl(i,u,l,!1,d,I)}function Bl(i,u,l,d,I,R){if(!u)throw Error("Invalid event type");const N=c(I)?!!I.capture:!!I;let z=Ks(i);if(z||(i[Gs]=z=new Dr(i)),l=z.add(u,l,d,N,R),l.proxy)return l;if(d=$l(),l.proxy=d,d.src=i,d.listener=l,i.addEventListener)A||(I=N),I===void 0&&(I=!1),i.addEventListener(u.toString(),d,I);else if(i.attachEvent)i.attachEvent(Uo(u.toString()),d);else if(i.addListener&&i.removeListener)i.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");return l}function $l(){function i(l){return u.call(i.src,i.listener,l)}const u=ql;return i}function Mo(i,u,l,d,I){if(Array.isArray(u))for(var R=0;R<u.length;R++)Mo(i,u[R],l,d,I);else d=c(d)?!!d.capture:!!d,l=Fo(l),i&&i[ke]?(i=i.i,R=String(u).toString(),R in i.g&&(u=i.g[R],l=zs(u,l,d,I),l>-1&&(br(u[l]),Array.prototype.splice.call(u,l,1),u.length==0&&(delete i.g[R],i.h--)))):i&&(i=Ks(i))&&(u=i.g[u.toString()],i=-1,u&&(i=zs(u,l,d,I)),(l=i>-1?u[i]:null)&&Qs(l))}function Qs(i){if(typeof i!="number"&&i&&!i.da){var u=i.src;if(u&&u[ke])js(u.i,i);else{var l=i.type,d=i.proxy;u.removeEventListener?u.removeEventListener(l,d,i.capture):u.detachEvent?u.detachEvent(Uo(l),d):u.addListener&&u.removeListener&&u.removeListener(d),(l=Ks(u))?(js(l,i),l.h==0&&(l.src=null,u[Gs]=null)):br(i)}}}function Uo(i){return i in Hs?Hs[i]:Hs[i]="on"+i}function ql(i,u){if(i.da)i=!0;else{u=new bt(u,this);const l=i.listener,d=i.ha||i.src;i.fa&&Qs(i),i=l.call(d,u)}return i}function Ks(i){return i=i[Gs],i instanceof Dr?i:null}var Ws="__closure_events_fn_"+(Math.random()*1e9>>>0);function Fo(i){return typeof i=="function"?i:(i[Ws]||(i[Ws]=function(u){return i.handleEvent(u)}),i[Ws])}function wt(){w.call(this),this.i=new Dr(this),this.M=this,this.G=null}p(wt,w),wt.prototype[ke]=!0,wt.prototype.removeEventListener=function(i,u,l,d){Mo(this,i,u,l,d)};function Pt(i,u){var l,d=i.G;if(d)for(l=[];d;d=d.G)l.push(d);if(i=i.M,d=u.type||u,typeof u=="string")u=new T(u,i);else if(u instanceof T)u.target=u.target||i;else{var I=u;u=new T(d,i),Oo(u,I)}I=!0;let R,N;if(l)for(N=l.length-1;N>=0;N--)R=u.g=l[N],I=Nr(R,d,!0,u)&&I;if(R=u.g=i,I=Nr(R,d,!0,u)&&I,I=Nr(R,d,!1,u)&&I,l)for(N=0;N<l.length;N++)R=u.g=l[N],I=Nr(R,d,!1,u)&&I}wt.prototype.N=function(){if(wt.Z.N.call(this),this.i){var i=this.i;for(const u in i.g){const l=i.g[u];for(let d=0;d<l.length;d++)br(l[d]);delete i.g[u],i.h--}}this.G=null},wt.prototype.J=function(i,u,l,d){return this.i.add(String(i),u,!1,l,d)},wt.prototype.K=function(i,u,l,d){return this.i.add(String(i),u,!0,l,d)};function Nr(i,u,l,d){if(u=i.i.g[String(u)],!u)return!0;u=u.concat();let I=!0;for(let R=0;R<u.length;++R){const N=u[R];if(N&&!N.da&&N.capture==l){const z=N.listener,ht=N.ha||N.src;N.fa&&js(i.i,N),I=z.call(ht,d)!==!1&&I}}return I&&!d.defaultPrevented}function jl(i,u){if(typeof i!="function")if(i&&typeof i.handleEvent=="function")i=f(i.handleEvent,i);else throw Error("Invalid listener argument");return Number(u)>2147483647?-1:a.setTimeout(i,u||0)}function Bo(i){i.g=jl(()=>{i.g=null,i.i&&(i.i=!1,Bo(i))},i.l);const u=i.h;i.h=null,i.m.apply(null,u)}class zl extends w{constructor(u,l){super(),this.m=u,this.l=l,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:Bo(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Pn(i){w.call(this),this.h=i,this.g={}}p(Pn,w);var $o=[];function qo(i){xr(i.g,function(u,l){this.g.hasOwnProperty(l)&&Qs(u)},i),i.g={}}Pn.prototype.N=function(){Pn.Z.N.call(this),qo(this)},Pn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ys=a.JSON.stringify,Gl=a.JSON.parse,Hl=class{stringify(i){return a.JSON.stringify(i,void 0)}parse(i){return a.JSON.parse(i,void 0)}};function jo(){}function zo(){}var Sn={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Js(){T.call(this,"d")}p(Js,T);function Xs(){T.call(this,"c")}p(Xs,T);var Oe={},Go=null;function kr(){return Go=Go||new wt}Oe.Ia="serverreachability";function Ho(i){T.call(this,Oe.Ia,i)}p(Ho,T);function Cn(i){const u=kr();Pt(u,new Ho(u))}Oe.STAT_EVENT="statevent";function Qo(i,u){T.call(this,Oe.STAT_EVENT,i),this.stat=u}p(Qo,T);function St(i){const u=kr();Pt(u,new Qo(u,i))}Oe.Ja="timingevent";function Ko(i,u){T.call(this,Oe.Ja,i),this.size=u}p(Ko,T);function bn(i,u){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){i()},u)}function xn(){this.g=!0}xn.prototype.ua=function(){this.g=!1};function Ql(i,u,l,d,I,R){i.info(function(){if(i.g)if(R){var N="",z=R.split("&");for(let X=0;X<z.length;X++){var ht=z[X].split("=");if(ht.length>1){const pt=ht[0];ht=ht[1];const Kt=pt.split("_");N=Kt.length>=2&&Kt[1]=="type"?N+(pt+"="+ht+"&"):N+(pt+"=redacted&")}}}else N=null;else N=R;return"XMLHTTP REQ ("+d+") [attempt "+I+"]: "+u+`
`+l+`
`+N})}function Kl(i,u,l,d,I,R,N){i.info(function(){return"XMLHTTP RESP ("+d+") [ attempt "+I+"]: "+u+`
`+l+`
`+R+" "+N})}function tn(i,u,l,d){i.info(function(){return"XMLHTTP TEXT ("+u+"): "+Yl(i,l)+(d?" "+d:"")})}function Wl(i,u){i.info(function(){return"TIMEOUT: "+u})}xn.prototype.info=function(){};function Yl(i,u){if(!i.g)return u;if(!u)return null;try{const R=JSON.parse(u);if(R){for(i=0;i<R.length;i++)if(Array.isArray(R[i])){var l=R[i];if(!(l.length<2)){var d=l[1];if(Array.isArray(d)&&!(d.length<1)){var I=d[0];if(I!="noop"&&I!="stop"&&I!="close")for(let N=1;N<d.length;N++)d[N]=""}}}}return Ys(R)}catch{return u}}var Or={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Wo={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Yo;function Zs(){}p(Zs,jo),Zs.prototype.g=function(){return new XMLHttpRequest},Yo=new Zs;function Dn(i){return encodeURIComponent(String(i))}function Jl(i){var u=1;i=i.split(":");const l=[];for(;u>0&&i.length;)l.push(i.shift()),u--;return i.length&&l.push(i.join(":")),l}function fe(i,u,l,d){this.j=i,this.i=u,this.l=l,this.S=d||1,this.V=new Pn(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Jo}function Jo(){this.i=null,this.g="",this.h=!1}var Xo={},ti={};function ei(i,u,l){i.M=1,i.A=Mr(Qt(u)),i.u=l,i.R=!0,Zo(i,null)}function Zo(i,u){i.F=Date.now(),Lr(i),i.B=Qt(i.A);var l=i.B,d=i.S;Array.isArray(d)||(d=[String(d)]),fa(l.i,"t",d),i.C=0,l=i.j.L,i.h=new Jo,i.g=ba(i.j,l?u:null,!i.u),i.P>0&&(i.O=new zl(f(i.Y,i,i.g),i.P)),u=i.V,l=i.g,d=i.ba;var I="readystatechange";Array.isArray(I)||(I&&($o[0]=I.toString()),I=$o);for(let R=0;R<I.length;R++){const N=Lo(l,I[R],d||u.handleEvent,!1,u.h||u);if(!N)break;u.g[N.key]=N}u=i.J?No(i.J):{},i.u?(i.v||(i.v="POST"),u["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.B,i.v,i.u,u)):(i.v="GET",i.g.ea(i.B,i.v,null,u)),Cn(),Ql(i.i,i.v,i.B,i.l,i.S,i.u)}fe.prototype.ba=function(i){i=i.target;const u=this.O;u&&pe(i)==3?u.j():this.Y(i)},fe.prototype.Y=function(i){try{if(i==this.g)t:{const z=pe(this.g),ht=this.g.ya(),X=this.g.ca();if(!(z<3)&&(z!=3||this.g&&(this.h.h||this.g.la()||Ea(this.g)))){this.K||z!=4||ht==7||(ht==8||X<=0?Cn(3):Cn(2)),ni(this);var u=this.g.ca();this.X=u;var l=Xl(this);if(this.o=u==200,Kl(this.i,this.v,this.B,this.l,this.S,z,u),this.o){if(this.U&&!this.L){e:{if(this.g){var d,I=this.g;if((d=I.g?I.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!_(d)){var R=d;break e}}R=null}if(i=R)tn(this.i,this.l,i,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,ri(this,i);else{this.o=!1,this.m=3,St(12),Le(this),Nn(this);break t}}if(this.R){i=!0;let pt;for(;!this.K&&this.C<l.length;)if(pt=Zl(this,l),pt==ti){z==4&&(this.m=4,St(14),i=!1),tn(this.i,this.l,null,"[Incomplete Response]");break}else if(pt==Xo){this.m=4,St(15),tn(this.i,this.l,l,"[Invalid Chunk]"),i=!1;break}else tn(this.i,this.l,pt,null),ri(this,pt);if(ta(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),z!=4||l.length!=0||this.h.h||(this.m=1,St(16),i=!1),this.o=this.o&&i,!i)tn(this.i,this.l,l,"[Invalid Chunked Response]"),Le(this),Nn(this);else if(l.length>0&&!this.W){this.W=!0;var N=this.j;N.g==this&&N.aa&&!N.P&&(N.j.info("Great, no buffering proxy detected. Bytes received: "+l.length),hi(N),N.P=!0,St(11))}}else tn(this.i,this.l,l,null),ri(this,l);z==4&&Le(this),this.o&&!this.K&&(z==4?Ra(this.j,this):(this.o=!1,Lr(this)))}else dh(this.g),u==400&&l.indexOf("Unknown SID")>0?(this.m=3,St(12)):(this.m=0,St(13)),Le(this),Nn(this)}}}catch{}finally{}};function Xl(i){if(!ta(i))return i.g.la();const u=Ea(i.g);if(u==="")return"";let l="";const d=u.length,I=pe(i.g)==4;if(!i.h.i){if(typeof TextDecoder>"u")return Le(i),Nn(i),"";i.h.i=new a.TextDecoder}for(let R=0;R<d;R++)i.h.h=!0,l+=i.h.i.decode(u[R],{stream:!(I&&R==d-1)});return u.length=0,i.h.g+=l,i.C=0,i.h.g}function ta(i){return i.g?i.v=="GET"&&i.M!=2&&i.j.Aa:!1}function Zl(i,u){var l=i.C,d=u.indexOf(`
`,l);return d==-1?ti:(l=Number(u.substring(l,d)),isNaN(l)?Xo:(d+=1,d+l>u.length?ti:(u=u.slice(d,d+l),i.C=d+l,u)))}fe.prototype.cancel=function(){this.K=!0,Le(this)};function Lr(i){i.T=Date.now()+i.H,ea(i,i.H)}function ea(i,u){if(i.D!=null)throw Error("WatchDog timer not null");i.D=bn(f(i.aa,i),u)}function ni(i){i.D&&(a.clearTimeout(i.D),i.D=null)}fe.prototype.aa=function(){this.D=null;const i=Date.now();i-this.T>=0?(Wl(this.i,this.B),this.M!=2&&(Cn(),St(17)),Le(this),this.m=2,Nn(this)):ea(this,this.T-i)};function Nn(i){i.j.I==0||i.K||Ra(i.j,i)}function Le(i){ni(i);var u=i.O;u&&typeof u.dispose=="function"&&u.dispose(),i.O=null,qo(i.V),i.g&&(u=i.g,i.g=null,u.abort(),u.dispose())}function ri(i,u){try{var l=i.j;if(l.I!=0&&(l.g==i||si(l.h,i))){if(!i.L&&si(l.h,i)&&l.I==3){try{var d=l.Ba.g.parse(u)}catch{d=null}if(Array.isArray(d)&&d.length==3){var I=d;if(I[0]==0){t:if(!l.v){if(l.g)if(l.g.F+3e3<i.F)qr(l),Br(l);else break t;li(l),St(18)}}else l.xa=I[1],0<l.xa-l.K&&I[2]<37500&&l.F&&l.A==0&&!l.C&&(l.C=bn(f(l.Va,l),6e3));sa(l.h)<=1&&l.ta&&(l.ta=void 0)}else Ue(l,11)}else if((i.L||l.g==i)&&qr(l),!_(u))for(I=l.Ba.g.parse(u),u=0;u<I.length;u++){let X=I[u];const pt=X[0];if(!(pt<=l.K))if(l.K=pt,X=X[1],l.I==2)if(X[0]=="c"){l.M=X[1],l.ba=X[2];const Kt=X[3];Kt!=null&&(l.ka=Kt,l.j.info("VER="+l.ka));const Fe=X[4];Fe!=null&&(l.za=Fe,l.j.info("SVER="+l.za));const ge=X[5];ge!=null&&typeof ge=="number"&&ge>0&&(d=1.5*ge,l.O=d,l.j.info("backChannelRequestTimeoutMs_="+d)),d=l;const _e=i.g;if(_e){const zr=_e.g?_e.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(zr){var R=d.h;R.g||zr.indexOf("spdy")==-1&&zr.indexOf("quic")==-1&&zr.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(ii(R,R.h),R.h=null))}if(d.G){const fi=_e.g?_e.g.getResponseHeader("X-HTTP-Session-Id"):null;fi&&(d.wa=fi,Z(d.J,d.G,fi))}}l.I=3,l.l&&l.l.ra(),l.aa&&(l.T=Date.now()-i.F,l.j.info("Handshake RTT: "+l.T+"ms")),d=l;var N=i;if(d.na=Ca(d,d.L?d.ba:null,d.W),N.L){ia(d.h,N);var z=N,ht=d.O;ht&&(z.H=ht),z.D&&(ni(z),Lr(z)),d.g=N}else Aa(d);l.i.length>0&&$r(l)}else X[0]!="stop"&&X[0]!="close"||Ue(l,7);else l.I==3&&(X[0]=="stop"||X[0]=="close"?X[0]=="stop"?Ue(l,7):ci(l):X[0]!="noop"&&l.l&&l.l.qa(X),l.A=0)}}Cn(4)}catch{}}var th=class{constructor(i,u){this.g=i,this.map=u}};function na(i){this.l=i||10,a.PerformanceNavigationTiming?(i=a.performance.getEntriesByType("navigation"),i=i.length>0&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function ra(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function sa(i){return i.h?1:i.g?i.g.size:0}function si(i,u){return i.h?i.h==u:i.g?i.g.has(u):!1}function ii(i,u){i.g?i.g.add(u):i.h=u}function ia(i,u){i.h&&i.h==u?i.h=null:i.g&&i.g.has(u)&&i.g.delete(u)}na.prototype.cancel=function(){if(this.i=oa(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function oa(i){if(i.h!=null)return i.i.concat(i.h.G);if(i.g!=null&&i.g.size!==0){let u=i.i;for(const l of i.g.values())u=u.concat(l.G);return u}return C(i.i)}var aa=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function eh(i,u){if(i){i=i.split("&");for(let l=0;l<i.length;l++){const d=i[l].indexOf("=");let I,R=null;d>=0?(I=i[l].substring(0,d),R=i[l].substring(d+1)):I=i[l],u(I,R?decodeURIComponent(R.replace(/\+/g," ")):"")}}}function de(i){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let u;i instanceof de?(this.l=i.l,kn(this,i.j),this.o=i.o,this.g=i.g,On(this,i.u),this.h=i.h,oi(this,da(i.i)),this.m=i.m):i&&(u=String(i).match(aa))?(this.l=!1,kn(this,u[1]||"",!0),this.o=Ln(u[2]||""),this.g=Ln(u[3]||"",!0),On(this,u[4]),this.h=Ln(u[5]||"",!0),oi(this,u[6]||"",!0),this.m=Ln(u[7]||"")):(this.l=!1,this.i=new Un(null,this.l))}de.prototype.toString=function(){const i=[];var u=this.j;u&&i.push(Mn(u,ua,!0),":");var l=this.g;return(l||u=="file")&&(i.push("//"),(u=this.o)&&i.push(Mn(u,ua,!0),"@"),i.push(Dn(l).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l=this.u,l!=null&&i.push(":",String(l))),(l=this.h)&&(this.g&&l.charAt(0)!="/"&&i.push("/"),i.push(Mn(l,l.charAt(0)=="/"?sh:rh,!0))),(l=this.i.toString())&&i.push("?",l),(l=this.m)&&i.push("#",Mn(l,oh)),i.join("")},de.prototype.resolve=function(i){const u=Qt(this);let l=!!i.j;l?kn(u,i.j):l=!!i.o,l?u.o=i.o:l=!!i.g,l?u.g=i.g:l=i.u!=null;var d=i.h;if(l)On(u,i.u);else if(l=!!i.h){if(d.charAt(0)!="/")if(this.g&&!this.h)d="/"+d;else{var I=u.h.lastIndexOf("/");I!=-1&&(d=u.h.slice(0,I+1)+d)}if(I=d,I==".."||I==".")d="";else if(I.indexOf("./")!=-1||I.indexOf("/.")!=-1){d=I.lastIndexOf("/",0)==0,I=I.split("/");const R=[];for(let N=0;N<I.length;){const z=I[N++];z=="."?d&&N==I.length&&R.push(""):z==".."?((R.length>1||R.length==1&&R[0]!="")&&R.pop(),d&&N==I.length&&R.push("")):(R.push(z),d=!0)}d=R.join("/")}else d=I}return l?u.h=d:l=i.i.toString()!=="",l?oi(u,da(i.i)):l=!!i.m,l&&(u.m=i.m),u};function Qt(i){return new de(i)}function kn(i,u,l){i.j=l?Ln(u,!0):u,i.j&&(i.j=i.j.replace(/:$/,""))}function On(i,u){if(u){if(u=Number(u),isNaN(u)||u<0)throw Error("Bad port number "+u);i.u=u}else i.u=null}function oi(i,u,l){u instanceof Un?(i.i=u,ah(i.i,i.l)):(l||(u=Mn(u,ih)),i.i=new Un(u,i.l))}function Z(i,u,l){i.i.set(u,l)}function Mr(i){return Z(i,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),i}function Ln(i,u){return i?u?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function Mn(i,u,l){return typeof i=="string"?(i=encodeURI(i).replace(u,nh),l&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function nh(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var ua=/[#\/\?@]/g,rh=/[#\?:]/g,sh=/[#\?]/g,ih=/[#\?@]/g,oh=/#/g;function Un(i,u){this.h=this.g=null,this.i=i||null,this.j=!!u}function Me(i){i.g||(i.g=new Map,i.h=0,i.i&&eh(i.i,function(u,l){i.add(decodeURIComponent(u.replace(/\+/g," ")),l)}))}n=Un.prototype,n.add=function(i,u){Me(this),this.i=null,i=en(this,i);let l=this.g.get(i);return l||this.g.set(i,l=[]),l.push(u),this.h+=1,this};function ca(i,u){Me(i),u=en(i,u),i.g.has(u)&&(i.i=null,i.h-=i.g.get(u).length,i.g.delete(u))}function la(i,u){return Me(i),u=en(i,u),i.g.has(u)}n.forEach=function(i,u){Me(this),this.g.forEach(function(l,d){l.forEach(function(I){i.call(u,I,d,this)},this)},this)};function ha(i,u){Me(i);let l=[];if(typeof u=="string")la(i,u)&&(l=l.concat(i.g.get(en(i,u))));else for(i=Array.from(i.g.values()),u=0;u<i.length;u++)l=l.concat(i[u]);return l}n.set=function(i,u){return Me(this),this.i=null,i=en(this,i),la(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[u]),this.h+=1,this},n.get=function(i,u){return i?(i=ha(this,i),i.length>0?String(i[0]):u):u};function fa(i,u,l){ca(i,u),l.length>0&&(i.i=null,i.g.set(en(i,u),C(l)),i.h+=l.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],u=Array.from(this.g.keys());for(let d=0;d<u.length;d++){var l=u[d];const I=Dn(l);l=ha(this,l);for(let R=0;R<l.length;R++){let N=I;l[R]!==""&&(N+="="+Dn(l[R])),i.push(N)}}return this.i=i.join("&")};function da(i){const u=new Un;return u.i=i.i,i.g&&(u.g=new Map(i.g),u.h=i.h),u}function en(i,u){return u=String(u),i.j&&(u=u.toLowerCase()),u}function ah(i,u){u&&!i.j&&(Me(i),i.i=null,i.g.forEach(function(l,d){const I=d.toLowerCase();d!=I&&(ca(this,d),fa(this,I,l))},i)),i.j=u}function uh(i,u){const l=new xn;if(a.Image){const d=new Image;d.onload=m(me,l,"TestLoadImage: loaded",!0,u,d),d.onerror=m(me,l,"TestLoadImage: error",!1,u,d),d.onabort=m(me,l,"TestLoadImage: abort",!1,u,d),d.ontimeout=m(me,l,"TestLoadImage: timeout",!1,u,d),a.setTimeout(function(){d.ontimeout&&d.ontimeout()},1e4),d.src=i}else u(!1)}function ch(i,u){const l=new xn,d=new AbortController,I=setTimeout(()=>{d.abort(),me(l,"TestPingServer: timeout",!1,u)},1e4);fetch(i,{signal:d.signal}).then(R=>{clearTimeout(I),R.ok?me(l,"TestPingServer: ok",!0,u):me(l,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(I),me(l,"TestPingServer: error",!1,u)})}function me(i,u,l,d,I){try{I&&(I.onload=null,I.onerror=null,I.onabort=null,I.ontimeout=null),d(l)}catch{}}function lh(){this.g=new Hl}function ai(i){this.i=i.Sb||null,this.h=i.ab||!1}p(ai,jo),ai.prototype.g=function(){return new Ur(this.i,this.h)};function Ur(i,u){wt.call(this),this.H=i,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(Ur,wt),n=Ur.prototype,n.open=function(i,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=i,this.D=u,this.readyState=1,Bn(this)},n.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const u={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};i&&(u.body=i),(this.H||a).fetch(new Request(this.D,u)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Fn(this)),this.readyState=0},n.Pa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,Bn(this)),this.g&&(this.readyState=3,Bn(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;ma(this)}else i.text().then(this.Oa.bind(this),this.ga.bind(this))};function ma(i){i.j.read().then(i.Ma.bind(i)).catch(i.ga.bind(i))}n.Ma=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var u=i.value?i.value:new Uint8Array(0);(u=this.B.decode(u,{stream:!i.done}))&&(this.response=this.responseText+=u)}i.done?Fn(this):Bn(this),this.readyState==3&&ma(this)}},n.Oa=function(i){this.g&&(this.response=this.responseText=i,Fn(this))},n.Na=function(i){this.g&&(this.response=i,Fn(this))},n.ga=function(){this.g&&Fn(this)};function Fn(i){i.readyState=4,i.l=null,i.j=null,i.B=null,Bn(i)}n.setRequestHeader=function(i,u){this.A.append(i,u)},n.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],u=this.h.entries();for(var l=u.next();!l.done;)l=l.value,i.push(l[0]+": "+l[1]),l=u.next();return i.join(`\r
`)};function Bn(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(Ur.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function pa(i){let u="";return xr(i,function(l,d){u+=d,u+=":",u+=l,u+=`\r
`}),u}function ui(i,u,l){t:{for(d in l){var d=!1;break t}d=!0}d||(l=pa(l),typeof i=="string"?l!=null&&Dn(l):Z(i,u,l))}function st(i){wt.call(this),this.headers=new Map,this.L=i||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(st,wt);var hh=/^https?$/i,fh=["POST","PUT"];n=st.prototype,n.Fa=function(i){this.H=i},n.ea=function(i,u,l,d){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);u=u?u.toUpperCase():"GET",this.D=i,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Yo.g(),this.g.onreadystatechange=V(f(this.Ca,this));try{this.B=!0,this.g.open(u,String(i),!0),this.B=!1}catch(R){ga(this,R);return}if(i=l||"",l=new Map(this.headers),d)if(Object.getPrototypeOf(d)===Object.prototype)for(var I in d)l.set(I,d[I]);else if(typeof d.keys=="function"&&typeof d.get=="function")for(const R of d.keys())l.set(R,d.get(R));else throw Error("Unknown input type for opt_headers: "+String(d));d=Array.from(l.keys()).find(R=>R.toLowerCase()=="content-type"),I=a.FormData&&i instanceof a.FormData,!(Array.prototype.indexOf.call(fh,u,void 0)>=0)||d||I||l.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,N]of l)this.g.setRequestHeader(R,N);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(i),this.v=!1}catch(R){ga(this,R)}};function ga(i,u){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=u,i.o=5,_a(i),Fr(i)}function _a(i){i.A||(i.A=!0,Pt(i,"complete"),Pt(i,"error"))}n.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=i||7,Pt(this,"complete"),Pt(this,"abort"),Fr(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Fr(this,!0)),st.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?ya(this):this.Xa())},n.Xa=function(){ya(this)};function ya(i){if(i.h&&typeof o<"u"){if(i.v&&pe(i)==4)setTimeout(i.Ca.bind(i),0);else if(Pt(i,"readystatechange"),pe(i)==4){i.h=!1;try{const R=i.ca();t:switch(R){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break t;default:u=!1}var l;if(!(l=u)){var d;if(d=R===0){let N=String(i.D).match(aa)[1]||null;!N&&a.self&&a.self.location&&(N=a.self.location.protocol.slice(0,-1)),d=!hh.test(N?N.toLowerCase():"")}l=d}if(l)Pt(i,"complete"),Pt(i,"success");else{i.o=6;try{var I=pe(i)>2?i.g.statusText:""}catch{I=""}i.l=I+" ["+i.ca()+"]",_a(i)}}finally{Fr(i)}}}}function Fr(i,u){if(i.g){i.m&&(clearTimeout(i.m),i.m=null);const l=i.g;i.g=null,u||Pt(i,"ready");try{l.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function pe(i){return i.g?i.g.readyState:0}n.ca=function(){try{return pe(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(i){if(this.g){var u=this.g.responseText;return i&&u.indexOf(i)==0&&(u=u.substring(i.length)),Gl(u)}};function Ea(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.F){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function dh(i){const u={};i=(i.g&&pe(i)>=2&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let d=0;d<i.length;d++){if(_(i[d]))continue;var l=Jl(i[d]);const I=l[0];if(l=l[1],typeof l!="string")continue;l=l.trim();const R=u[I]||[];u[I]=R,R.push(l)}Fl(u,function(d){return d.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function $n(i,u,l){return l&&l.internalChannelParams&&l.internalChannelParams[i]||u}function Ta(i){this.za=0,this.i=[],this.j=new xn,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=$n("failFast",!1,i),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=$n("baseRetryDelayMs",5e3,i),this.Za=$n("retryDelaySeedMs",1e4,i),this.Ta=$n("forwardChannelMaxRetries",2,i),this.va=$n("forwardChannelRequestTimeoutMs",2e4,i),this.ma=i&&i.xmlHttpFactory||void 0,this.Ua=i&&i.Rb||void 0,this.Aa=i&&i.useFetchStreams||!1,this.O=void 0,this.L=i&&i.supportsCrossDomainXhr||!1,this.M="",this.h=new na(i&&i.concurrentRequestLimit),this.Ba=new lh,this.S=i&&i.fastHandshake||!1,this.R=i&&i.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=i&&i.Pb||!1,i&&i.ua&&this.j.ua(),i&&i.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&i&&i.detectBufferingProxy||!1,this.ia=void 0,i&&i.longPollingTimeout&&i.longPollingTimeout>0&&(this.ia=i.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Ta.prototype,n.ka=8,n.I=1,n.connect=function(i,u,l,d){St(0),this.W=i,this.H=u||{},l&&d!==void 0&&(this.H.OSID=l,this.H.OAID=d),this.F=this.X,this.J=Ca(this,null,this.W),$r(this)};function ci(i){if(va(i),i.I==3){var u=i.V++,l=Qt(i.J);if(Z(l,"SID",i.M),Z(l,"RID",u),Z(l,"TYPE","terminate"),qn(i,l),u=new fe(i,i.j,u),u.M=2,u.A=Mr(Qt(l)),l=!1,a.navigator&&a.navigator.sendBeacon)try{l=a.navigator.sendBeacon(u.A.toString(),"")}catch{}!l&&a.Image&&(new Image().src=u.A,l=!0),l||(u.g=ba(u.j,null),u.g.ea(u.A)),u.F=Date.now(),Lr(u)}Sa(i)}function Br(i){i.g&&(hi(i),i.g.cancel(),i.g=null)}function va(i){Br(i),i.v&&(a.clearTimeout(i.v),i.v=null),qr(i),i.h.cancel(),i.m&&(typeof i.m=="number"&&a.clearTimeout(i.m),i.m=null)}function $r(i){if(!ra(i.h)&&!i.m){i.m=!0;var u=i.Ea;Tt||g(),vt||(Tt(),vt=!0),v.add(u,i),i.D=0}}function mh(i,u){return sa(i.h)>=i.h.j-(i.m?1:0)?!1:i.m?(i.i=u.G.concat(i.i),!0):i.I==1||i.I==2||i.D>=(i.Sa?0:i.Ta)?!1:(i.m=bn(f(i.Ea,i,u),Pa(i,i.D)),i.D++,!0)}n.Ea=function(i){if(this.m)if(this.m=null,this.I==1){if(!i){this.V=Math.floor(Math.random()*1e5),i=this.V++;const I=new fe(this,this.j,i);let R=this.o;if(this.U&&(R?(R=No(R),Oo(R,this.U)):R=this.U),this.u!==null||this.R||(I.J=R,R=null),this.S)t:{for(var u=0,l=0;l<this.i.length;l++){e:{var d=this.i[l];if("__data__"in d.map&&(d=d.map.__data__,typeof d=="string")){d=d.length;break e}d=void 0}if(d===void 0)break;if(u+=d,u>4096){u=l;break t}if(u===4096||l===this.i.length-1){u=l+1;break t}}u=1e3}else u=1e3;u=Ia(this,I,u),l=Qt(this.J),Z(l,"RID",i),Z(l,"CVER",22),this.G&&Z(l,"X-HTTP-Session-Id",this.G),qn(this,l),R&&(this.R?u="headers="+Dn(pa(R))+"&"+u:this.u&&ui(l,this.u,R)),ii(this.h,I),this.Ra&&Z(l,"TYPE","init"),this.S?(Z(l,"$req",u),Z(l,"SID","null"),I.U=!0,ei(I,l,null)):ei(I,l,u),this.I=2}}else this.I==3&&(i?wa(this,i):this.i.length==0||ra(this.h)||wa(this))};function wa(i,u){var l;u?l=u.l:l=i.V++;const d=Qt(i.J);Z(d,"SID",i.M),Z(d,"RID",l),Z(d,"AID",i.K),qn(i,d),i.u&&i.o&&ui(d,i.u,i.o),l=new fe(i,i.j,l,i.D+1),i.u===null&&(l.J=i.o),u&&(i.i=u.G.concat(i.i)),u=Ia(i,l,1e3),l.H=Math.round(i.va*.5)+Math.round(i.va*.5*Math.random()),ii(i.h,l),ei(l,d,u)}function qn(i,u){i.H&&xr(i.H,function(l,d){Z(u,d,l)}),i.l&&xr({},function(l,d){Z(u,d,l)})}function Ia(i,u,l){l=Math.min(i.i.length,l);const d=i.l?f(i.l.Ka,i.l,i):null;t:{var I=i.i;let z=-1;for(;;){const ht=["count="+l];z==-1?l>0?(z=I[0].g,ht.push("ofs="+z)):z=0:ht.push("ofs="+z);let X=!0;for(let pt=0;pt<l;pt++){var R=I[pt].g;const Kt=I[pt].map;if(R-=z,R<0)z=Math.max(0,I[pt].g-100),X=!1;else try{R="req"+R+"_"||"";try{var N=Kt instanceof Map?Kt:Object.entries(Kt);for(const[Fe,ge]of N){let _e=ge;c(ge)&&(_e=Ys(ge)),ht.push(R+Fe+"="+encodeURIComponent(_e))}}catch(Fe){throw ht.push(R+"type="+encodeURIComponent("_badmap")),Fe}}catch{d&&d(Kt)}}if(X){N=ht.join("&");break t}}N=void 0}return i=i.i.splice(0,l),u.G=i,N}function Aa(i){if(!i.g&&!i.v){i.Y=1;var u=i.Da;Tt||g(),vt||(Tt(),vt=!0),v.add(u,i),i.A=0}}function li(i){return i.g||i.v||i.A>=3?!1:(i.Y++,i.v=bn(f(i.Da,i),Pa(i,i.A)),i.A++,!0)}n.Da=function(){if(this.v=null,Va(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var i=4*this.T;this.j.info("BP detection timer enabled: "+i),this.B=bn(f(this.Wa,this),i)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,St(10),Br(this),Va(this))};function hi(i){i.B!=null&&(a.clearTimeout(i.B),i.B=null)}function Va(i){i.g=new fe(i,i.j,"rpc",i.Y),i.u===null&&(i.g.J=i.o),i.g.P=0;var u=Qt(i.na);Z(u,"RID","rpc"),Z(u,"SID",i.M),Z(u,"AID",i.K),Z(u,"CI",i.F?"0":"1"),!i.F&&i.ia&&Z(u,"TO",i.ia),Z(u,"TYPE","xmlhttp"),qn(i,u),i.u&&i.o&&ui(u,i.u,i.o),i.O&&(i.g.H=i.O);var l=i.g;i=i.ba,l.M=1,l.A=Mr(Qt(u)),l.u=null,l.R=!0,Zo(l,i)}n.Va=function(){this.C!=null&&(this.C=null,Br(this),li(this),St(19))};function qr(i){i.C!=null&&(a.clearTimeout(i.C),i.C=null)}function Ra(i,u){var l=null;if(i.g==u){qr(i),hi(i),i.g=null;var d=2}else if(si(i.h,u))l=u.G,ia(i.h,u),d=1;else return;if(i.I!=0){if(u.o)if(d==1){l=u.u?u.u.length:0,u=Date.now()-u.F;var I=i.D;d=kr(),Pt(d,new Ko(d,l)),$r(i)}else Aa(i);else if(I=u.m,I==3||I==0&&u.X>0||!(d==1&&mh(i,u)||d==2&&li(i)))switch(l&&l.length>0&&(u=i.h,u.i=u.i.concat(l)),I){case 1:Ue(i,5);break;case 4:Ue(i,10);break;case 3:Ue(i,6);break;default:Ue(i,2)}}}function Pa(i,u){let l=i.Qa+Math.floor(Math.random()*i.Za);return i.isActive()||(l*=2),l*u}function Ue(i,u){if(i.j.info("Error code "+u),u==2){var l=f(i.bb,i),d=i.Ua;const I=!d;d=new de(d||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||kn(d,"https"),Mr(d),I?uh(d.toString(),l):ch(d.toString(),l)}else St(2);i.I=0,i.l&&i.l.pa(u),Sa(i),va(i)}n.bb=function(i){i?(this.j.info("Successfully pinged google.com"),St(2)):(this.j.info("Failed to ping google.com"),St(1))};function Sa(i){if(i.I=0,i.ja=[],i.l){const u=oa(i.h);(u.length!=0||i.i.length!=0)&&(x(i.ja,u),x(i.ja,i.i),i.h.i.length=0,C(i.i),i.i.length=0),i.l.oa()}}function Ca(i,u,l){var d=l instanceof de?Qt(l):new de(l);if(d.g!="")u&&(d.g=u+"."+d.g),On(d,d.u);else{var I=a.location;d=I.protocol,u=u?u+"."+I.hostname:I.hostname,I=+I.port;const R=new de(null);d&&kn(R,d),u&&(R.g=u),I&&On(R,I),l&&(R.h=l),d=R}return l=i.G,u=i.wa,l&&u&&Z(d,l,u),Z(d,"VER",i.ka),qn(i,d),d}function ba(i,u,l){if(u&&!i.L)throw Error("Can't create secondary domain capable XhrIo object.");return u=i.Aa&&!i.ma?new st(new ai({ab:l})):new st(i.ma),u.Fa(i.L),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function xa(){}n=xa.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function jr(){}jr.prototype.g=function(i,u){return new Mt(i,u)};function Mt(i,u){wt.call(this),this.g=new Ta(u),this.l=i,this.h=u&&u.messageUrlParams||null,i=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(i?i["X-WebChannel-Content-Type"]=u.messageContentType:i={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.sa&&(i?i["X-WebChannel-Client-Profile"]=u.sa:i={"X-WebChannel-Client-Profile":u.sa}),this.g.U=i,(i=u&&u.Qb)&&!_(i)&&(this.g.u=i),this.A=u&&u.supportsCrossDomainXhr||!1,this.v=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!_(u)&&(this.g.G=u,i=this.h,i!==null&&u in i&&(i=this.h,u in i&&delete i[u])),this.j=new nn(this)}p(Mt,wt),Mt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Mt.prototype.close=function(){ci(this.g)},Mt.prototype.o=function(i){var u=this.g;if(typeof i=="string"){var l={};l.__data__=i,i=l}else this.v&&(l={},l.__data__=Ys(i),i=l);u.i.push(new th(u.Ya++,i)),u.I==3&&$r(u)},Mt.prototype.N=function(){this.g.l=null,delete this.j,ci(this.g),delete this.g,Mt.Z.N.call(this)};function Da(i){Js.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var u=i.__sm__;if(u){t:{for(const l in u){i=l;break t}i=void 0}(this.i=i)&&(i=this.i,u=u!==null&&i in u?u[i]:void 0),this.data=u}else this.data=i}p(Da,Js);function Na(){Xs.call(this),this.status=1}p(Na,Xs);function nn(i){this.g=i}p(nn,xa),nn.prototype.ra=function(){Pt(this.g,"a")},nn.prototype.qa=function(i){Pt(this.g,new Da(i))},nn.prototype.pa=function(i){Pt(this.g,new Na)},nn.prototype.oa=function(){Pt(this.g,"b")},jr.prototype.createWebChannel=jr.prototype.g,Mt.prototype.send=Mt.prototype.o,Mt.prototype.open=Mt.prototype.m,Mt.prototype.close=Mt.prototype.close,Ku=function(){return new jr},Qu=function(){return kr()},Hu=Oe,Ai={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Or.NO_ERROR=0,Or.TIMEOUT=8,Or.HTTP_ERROR=6,Jr=Or,Wo.COMPLETE="complete",Gu=Wo,zo.EventType=Sn,Sn.OPEN="a",Sn.CLOSE="b",Sn.ERROR="c",Sn.MESSAGE="d",wt.prototype.listen=wt.prototype.J,Gn=zo,st.prototype.listenOnce=st.prototype.K,st.prototype.getLastError=st.prototype.Ha,st.prototype.getLastErrorCode=st.prototype.ya,st.prototype.getStatus=st.prototype.ca,st.prototype.getResponseJson=st.prototype.La,st.prototype.getResponseText=st.prototype.la,st.prototype.send=st.prototype.ea,st.prototype.setWithCredentials=st.prototype.Fa,zu=st}).apply(typeof Gr<"u"?Gr:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}At.UNAUTHENTICATED=new At(null),At.GOOGLE_CREDENTIALS=new At("google-credentials-uid"),At.FIRST_PARTY=new At("first-party-uid"),At.MOCK_USER=new At("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let En="12.15.0";function $f(n){En=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qe=new Bu("@firebase/firestore");function rn(){return Qe.logLevel}function k(n,...t){if(Qe.logLevel<=W.DEBUG){const e=t.map(zi);Qe.debug(`Firestore (${En}): ${n}`,...e)}}function le(n,...t){if(Qe.logLevel<=W.ERROR){const e=t.map(zi);Qe.error(`Firestore (${En}): ${n}`,...e)}}function Ht(n,...t){if(Qe.logLevel<=W.WARN){const e=t.map(zi);Qe.warn(`Firestore (${En}): ${n}`,...e)}}function zi(n){if(typeof n=="string")return n;try{return(function(e){return JSON.stringify(e)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F(n,t,e){let r="Unexpected state";typeof t=="string"?r=t:e=t,Wu(n,r,e)}function Wu(n,t,e){let r=`FIRESTORE (${En}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{r+=" CONTEXT: "+JSON.stringify(e)}catch{r+=" CONTEXT: "+e}throw le(r),new Error(r)}function M(n,t,e,r){let s="Unexpected state";typeof e=="string"?s=e:r=e,n||Wu(t,s,r)}function j(n,t){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class O extends yn{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yu{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class qf{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable((()=>e(At.UNAUTHENTICATED)))}shutdown(){}}class jf{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable((()=>e(this.token.user)))}shutdown(){this.changeListener=null}}class zf{constructor(t){this.t=t,this.currentUser=At.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){M(this.o===void 0,42304);let r=this.i;const s=h=>this.i!==r?(r=this.i,e(h)):Promise.resolve();let o=new ve;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new ve,t.enqueueRetryable((()=>s(this.currentUser)))};const a=()=>{const h=o;t.enqueueRetryable((async()=>{await h.promise,await s(this.currentUser)}))},c=h=>{k("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((h=>c(h))),setTimeout((()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?c(h):(k("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new ve)}}),0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then((r=>this.i!==t?(k("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(M(typeof r.accessToken=="string",31837,{l:r}),new Yu(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return M(t===null||typeof t=="string",2055,{h:t}),new At(t)}}class Gf{constructor(t,e,r){this.T=t,this.P=e,this.R=r,this.type="FirstParty",this.user=At.FIRST_PARTY,this.I=new Map}A(){return this.R?this.R():null}get headers(){this.I.set("X-Goog-AuthUser",this.T);const t=this.A();return t&&this.I.set("Authorization",t),this.P&&this.I.set("X-Goog-Iam-Authorization-Token",this.P),this.I}}class Hf{constructor(t,e,r){this.T=t,this.P=e,this.R=r}getToken(){return Promise.resolve(new Gf(this.T,this.P,this.R))}start(t,e){t.enqueueRetryable((()=>e(At.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class qa{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Qf{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Vf(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){M(this.o===void 0,3512);const r=o=>{o.error!=null&&k("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.m;return this.m=o.token,k("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable((()=>r(o)))};const s=o=>{k("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((o=>s(o))),setTimeout((()=>{if(!this.appCheck){const o=this.V.getImmediate({optional:!0});o?s(o):k("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new qa(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then((e=>e?(M(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new qa(e.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kf(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gi{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=Kf(40);for(let o=0;o<s.length;++o)r.length<20&&s[o]<e&&(r+=t.charAt(s[o]%62))}return r}}function H(n,t){return n<t?-1:n>t?1:0}function Vi(n,t){const e=Math.min(n.length,t.length);for(let r=0;r<e;r++){const s=n.charAt(r),o=t.charAt(r);if(s!==o)return mi(s)===mi(o)?H(s,o):mi(s)?1:-1}return H(n.length,t.length)}const Wf=55296,Yf=57343;function mi(n){const t=n.charCodeAt(0);return t>=Wf&&t<=Yf}function hn(n,t,e){return n.length===t.length&&n.every(((r,s)=>e(r,t[s])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yt="__name__";class Wt{constructor(t,e,r){e===void 0?e=0:e>t.length&&F(637,{offset:e,range:t.length}),r===void 0?r=t.length-e:r>t.length-e&&F(1746,{length:r,range:t.length-e}),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return Wt.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Wt?t.forEach((r=>{e.push(r)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const r=Math.min(t.length,e.length);for(let s=0;s<r;s++){const o=Wt.compareSegments(t.get(s),e.get(s));if(o!==0)return o}return H(t.length,e.length)}static compareSegments(t,e){const r=Wt.isNumericId(t),s=Wt.isNumericId(e);return r&&!s?-1:!r&&s?1:r&&s?Wt.extractNumericId(t).compare(Wt.extractNumericId(e)):Vi(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return Te.fromString(t.substring(4,t.length-2))}}class Y extends Wt{construct(t,e,r){return new Y(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toStringWithLeadingSlash(){return`/${this.canonicalString()}`}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const r of t){if(r.indexOf("//")>=0)throw new O(b.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter((s=>s.length>0)))}return new Y(e)}static emptyPath(){return new Y([])}}const Jf=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ft extends Wt{construct(t,e,r){return new ft(t,e,r)}static isValidIdentifier(t){return Jf.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ft.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Yt}static keyField(){return new ft([Yt])}static fromServerFormat(t){const e=[];let r="",s=0;const o=()=>{if(r.length===0)throw new O(b.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""};let a=!1;for(;s<t.length;){const c=t[s];if(c==="\\"){if(s+1===t.length)throw new O(b.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const h=t[s+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new O(b.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=h,s+=2}else c==="`"?(a=!a,s++):c!=="."||a?(r+=c,s++):(o(),s++)}if(o(),a)throw new O(b.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new ft(e)}static emptyPath(){return new ft([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U{constructor(t){this.path=t}static fromPath(t){return new U(Y.fromString(t))}static fromName(t){return new U(Y.fromString(t).popFirst(5))}static empty(){return new U(Y.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&Y.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return Y.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new U(new Y(t.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ju(n,t,e){if(!e)throw new O(b.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function Xf(n,t,e,r){if(t===!0&&r===!0)throw new O(b.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function ja(n){if(!U.isDocumentKey(n))throw new O(b.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function za(n){if(U.isDocumentKey(n))throw new O(b.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Tr(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Hi(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=(function(r){return r.constructor?r.constructor.name:null})(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":F(12329,{type:typeof n})}function ae(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new O(b.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=Hi(n);throw new O(b.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ot(n,t){const e={typeString:n};return t&&(e.value=t),e}function vr(n,t){if(!Tr(n))throw new O(b.INVALID_ARGUMENT,"JSON must be an object");let e;for(const r in t)if(t[r]){const s=t[r].typeString,o="value"in t[r]?{value:t[r].value}:void 0;if(!(r in n)){e=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){e=`JSON field '${r}' must be a ${s}.`;break}if(o!==void 0&&a!==o.value){e=`Expected '${r}' field to equal '${o.value}'`;break}}if(e)throw new O(b.INVALID_ARGUMENT,e);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ga=-62135596800,Ha=1e6;class tt{static now(){return tt.fromMillis(Date.now())}static fromDate(t){return tt.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),r=Math.floor((t-1e3*e)*Ha);return new tt(e,r)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new O(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new O(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<Ga)throw new O(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new O(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Ha}_compareTo(t){return this.seconds===t.seconds?H(this.nanoseconds,t.nanoseconds):H(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:tt._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(vr(t,tt._jsonSchema))return new tt(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-Ga;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}tt._jsonSchemaVersion="firestore/timestamp/1.0",tt._jsonSchema={type:ot("string",tt._jsonSchemaVersion),seconds:ot("number"),nanoseconds:ot("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q{static fromTimestamp(t){return new q(t)}static min(){return new q(new tt(0,0))}static max(){return new q(new tt(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ir=-1;function Zf(n,t){const e=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=q.fromTimestamp(r===1e9?new tt(e+1,0):new tt(e,r));return new Ve(s,U.empty(),t)}function td(n){return new Ve(n.readTime,n.key,ir)}class Ve{constructor(t,e,r){this.readTime=t,this.documentKey=e,this.largestBatchId=r}static min(){return new Ve(q.min(),U.empty(),ir)}static max(){return new Ve(q.max(),U.empty(),ir)}}function ed(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=U.comparator(n.documentKey,t.documentKey),e!==0?e:H(n.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nd="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class rd{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Tn(n){if(n.code!==b.FAILED_PRECONDITION||n.message!==nd)throw n;k("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)}),(e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)}))}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&F(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new S(((r,s)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(r,s)},this.catchCallback=o=>{this.wrapFailure(e,o).next(r,s)}}))}toPromise(){return new Promise(((t,e)=>{this.next(t,e)}))}wrapUserFunction(t){try{const e=t();return e instanceof S?e:S.resolve(e)}catch(e){return S.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction((()=>t(e))):S.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction((()=>t(e))):S.reject(e)}static resolve(t){return new S(((e,r)=>{e(t)}))}static reject(t){return new S(((e,r)=>{r(t)}))}static waitFor(t){return new S(((e,r)=>{let s=0,o=0,a=!1;t.forEach((c=>{++s,c.next((()=>{++o,a&&o===s&&e()}),(h=>r(h)))})),a=!0,o===s&&e()}))}static or(t){let e=S.resolve(!1);for(const r of t)e=e.next((s=>s?S.resolve(s):r()));return e}static forEach(t,e){const r=[];return t.forEach(((s,o)=>{r.push(e.call(this,s,o))})),this.waitFor(r)}static mapArray(t,e){return new S(((r,s)=>{const o=t.length,a=new Array(o);let c=0;for(let h=0;h<o;h++){const f=h;e(t[f]).next((m=>{a[f]=m,++c,c===o&&r(a)}),(m=>s(m)))}}))}static doWhile(t,e){return new S(((r,s)=>{const o=()=>{t()===!0?e().next((()=>{o()}),s):r()};o()}))}}function sd(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function vn(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Is{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>e.writeSequenceNumber(r))}ae(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ue&&this.ue(t),t}}Is.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qi=-1;function As(n){return n==null}function or(n){return n===0&&1/n==-1/0}function id(n){return typeof n=="number"&&Number.isInteger(n)&&!or(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}function od(n){return typeof n=="string"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xu="";function ad(n){let t="";for(let e=0;e<n.length;e++)t.length>0&&(t=Qa(t)),t=ud(n.get(e),t);return Qa(t)}function ud(n,t){let e=t;const r=n.length;for(let s=0;s<r;s++){const o=n.charAt(s);switch(o){case"\0":e+="";break;case Xu:e+="";break;default:e+=o}}return e}function Qa(n){return n+Xu+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(t,e){this.comparator=t,this.root=e||yt.EMPTY}insert(t,e){return new et(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,yt.BLACK,null,null))}remove(t){return new et(this.comparator,this.root.remove(t,this.comparator).copy(null,null,yt.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(t,r.key);if(s===0)return e+r.left.size;s<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,r)=>(t(e,r),!1)))}toString(){const t=[];return this.inorderTraversal(((e,r)=>(t.push(`${e}:${r}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Hr(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Hr(this.root,t,this.comparator,!1)}getReverseIterator(){return new Hr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Hr(this.root,t,this.comparator,!0)}}class Hr{constructor(t,e,r,s){this.isReverse=s,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?r(t.key,e):1,e&&s&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class yt{constructor(t,e,r,s,o){this.key=t,this.value=e,this.color=r??yt.RED,this.left=s??yt.EMPTY,this.right=o??yt.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,s,o){return new yt(t??this.key,e??this.value,r??this.color,s??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let s=this;const o=r(t,s.key);return s=o<0?s.copy(null,null,null,s.left.insert(t,e,r),null):o===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return yt.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return yt.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,yt.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,yt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw F(43730,{key:this.key,value:this.value});if(this.right.isRed())throw F(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw F(27949);return t+(this.isRed()?0:1)}}yt.EMPTY=null,yt.RED=!0,yt.BLACK=!1;yt.EMPTY=new class{constructor(){this.size=0}get key(){throw F(57766)}get value(){throw F(16141)}get color(){throw F(16727)}get left(){throw F(29726)}get right(){throw F(36894)}copy(t,e,r,s,o){return this}insert(t,e,r){return new yt(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(t){this.comparator=t,this.data=new et(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((e,r)=>(t(e),!1)))}forEachInRange(t,e){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Ka(this.data.getIterator())}getIteratorFrom(t){return new Ka(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach((r=>{e=e.add(r)})),e}isEqual(t){if(!(t instanceof ut)||this.size!==t.size)return!1;const e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(this.comparator(s,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach((e=>{t.push(e)})),t}toString(){const t=[];return this.forEach((e=>t.push(e))),"SortedSet("+t.toString()+")"}copy(t){const e=new ut(this.comparator);return e.data=t,e}}class Ka{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gt{constructor(t){this.fields=t,t.sort(ft.comparator)}static empty(){return new Gt([])}unionWith(t){let e=new ut(ft.comparator);for(const r of this.fields)e=e.add(r);for(const r of t)e=e.add(r);return new Gt(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return hn(this.fields,t.fields,((e,r)=>e.isEqual(r)))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function as(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function We(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function cd(n,t){const e=[];for(const r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.push(t(n[r],r,n));return e}function Zu(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tc extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct{constructor(t){this.binaryString=t}static fromBase64String(t){const e=(function(s){try{return atob(s)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new tc("Invalid base64 string: "+o):o}})(t);return new ct(e)}static fromUint8Array(t){const e=(function(s){let o="";for(let a=0;a<s.length;++a)o+=String.fromCharCode(s[a]);return o})(t);return new ct(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(e){return btoa(e)})(this.binaryString)}toUint8Array(){return(function(e){const r=new Uint8Array(e.length);for(let s=0;s<e.length;s++)r[s]=e.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return H(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}ct.EMPTY_BYTE_STRING=new ct("");const ld=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Re(n){if(M(!!n,39018),typeof n=="string"){let t=0;const e=ld.exec(n);if(M(!!e,46558,{timestamp:n}),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:nt(n.seconds),nanos:nt(n.nanos)}}function nt(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Pe(n){return typeof n=="string"?ct.fromBase64String(n):ct.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ec="server_timestamp",nc="__type__",rc="__previous_value__",sc="__local_write_time__";function Vs(n){var e,r;return((r=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[nc])==null?void 0:r.stringValue)===ec}function wr(n){const t=n.mapValue.fields[rc];return Vs(t)?wr(t):t}function fn(n){const t=Re(n.mapValue.fields[sc].timestampValue);return new tt(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hd{constructor(t,e,r,s,o,a,c,h,f,m,p){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=s,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=h,this.useFetchStreams=f,this.isUsingEmulator=m,this.apiKey=p}}const us="(default)";class ar{constructor(t,e){this.projectId=t,this.database=e||us}static empty(){return new ar("","")}get isDefaultDatabase(){return this.database===us}isEqual(t){return t instanceof ar&&t.projectId===this.projectId&&t.database===this.database}}function fd(n,t){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new O(b.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ar(n.options.projectId,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ic="__type__",dd="__max__",Qr={mapValue:{}},oc="__vector__",ur="value",dn={nullValue:"NULL_VALUE"},kt={booleanValue:!0},_t={booleanValue:!1};function lt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Vs(n)?4:md(n)?9007199254740991:cs(n)?10:11:F(28295,{value:n})}function zt(n,t,e){if(n===t)return!0;const r=lt(n);if(r!==lt(t))return!1;switch(r){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return fn(n).isEqual(fn(t));case 3:return(function(o,a){if(typeof o.timestampValue=="string"&&typeof a.timestampValue=="string"&&o.timestampValue.length===a.timestampValue.length)return o.timestampValue===a.timestampValue;const c=Re(o.timestampValue),h=Re(a.timestampValue);return c.seconds===h.seconds&&c.nanos===h.nanos})(n,t);case 5:return n.stringValue===t.stringValue;case 6:return(function(o,a){return Pe(o.bytesValue).isEqual(Pe(a.bytesValue))})(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return(function(o,a){return nt(o.geoPointValue.latitude)===nt(a.geoPointValue.latitude)&&nt(o.geoPointValue.longitude)===nt(a.geoPointValue.longitude)})(n,t);case 2:return(function(o,a,c){if("integerValue"in o&&"integerValue"in a)return nt(o.integerValue)===nt(a.integerValue);let h,f;if("doubleValue"in o&&"doubleValue"in a)h=nt(o.doubleValue),f=nt(a.doubleValue);else{if(!(c!=null&&c.Ee))return!1;h=nt(o.integerValue??o.doubleValue),f=nt(a.integerValue??a.doubleValue)}return h===f?!!(c!=null&&c.he)||or(h)===or(f):!!(c===void 0||c.Te)&&isNaN(h)&&isNaN(f)})(n,t,e);case 9:return hn(n.arrayValue.values||[],t.arrayValue.values||[],((s,o)=>zt(s,o,e)));case 10:case 11:return(function(o,a,c){const h=o.mapValue.fields||{},f=a.mapValue.fields||{};if(as(h)!==as(f))return!1;for(const m in h)if(h.hasOwnProperty(m)&&(f[m]===void 0||!zt(h[m],f[m],c)))return!1;return!0})(n,t,e);default:return F(52216,{left:n})}}function cr(n,t){return(n.values||[]).find((e=>zt(e,t)))!==void 0}function Ot(n,t){if(n===t)return 0;const e=lt(n),r=lt(t);if(e!==r)return H(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return H(n.booleanValue,t.booleanValue);case 2:return(function(o,a){const c=nt(o.integerValue||o.doubleValue),h=nt(a.integerValue||a.doubleValue);return c<h?-1:c>h?1:c===h?0:isNaN(c)?isNaN(h)?0:-1:1})(n,t);case 3:return Wa(n.timestampValue,t.timestampValue);case 4:return Wa(fn(n),fn(t));case 5:return Vi(n.stringValue,t.stringValue);case 6:return(function(o,a){const c=Pe(o),h=Pe(a);return c.compareTo(h)})(n.bytesValue,t.bytesValue);case 7:return(function(o,a){const c=o.split("/"),h=a.split("/");for(let f=0;f<c.length&&f<h.length;f++){const m=H(c[f],h[f]);if(m!==0)return m}return H(c.length,h.length)})(n.referenceValue,t.referenceValue);case 8:return(function(o,a){const c=H(nt(o.latitude),nt(a.latitude));return c!==0?c:H(nt(o.longitude),nt(a.longitude))})(n.geoPointValue,t.geoPointValue);case 9:return Ya(n.arrayValue,t.arrayValue);case 10:return(function(o,a){var V,C,x,B;const c=o.fields||{},h=a.fields||{},f=(V=c[ur])==null?void 0:V.arrayValue,m=(C=h[ur])==null?void 0:C.arrayValue,p=H(((x=f==null?void 0:f.values)==null?void 0:x.length)||0,((B=m==null?void 0:m.values)==null?void 0:B.length)||0);return p!==0?p:Ya(f,m)})(n.mapValue,t.mapValue);case 11:return(function(o,a){if(o===Qr.mapValue&&a===Qr.mapValue)return 0;if(o===Qr.mapValue)return 1;if(a===Qr.mapValue)return-1;const c=o.fields||{},h=Object.keys(c),f=a.fields||{},m=Object.keys(f);h.sort(),m.sort();for(let p=0;p<h.length&&p<m.length;++p){const V=Vi(h[p],m[p]);if(V!==0)return V;const C=Ot(c[h[p]],f[m[p]]);if(C!==0)return C}return H(h.length,m.length)})(n.mapValue,t.mapValue);default:throw F(23264,{Pe:e})}}function Wa(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return H(n,t);const e=Re(n),r=Re(t),s=H(e.seconds,r.seconds);return s!==0?s:H(e.nanos,r.nanos)}function Ya(n,t){const e=n.values||[],r=t.values||[];for(let s=0;s<e.length&&s<r.length;++s){const o=Ot(e[s],r[s]);if(o!==void 0&&o!==0)return o}return H(e.length,r.length)}function mn(n){return Ri(n)}function Ri(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(e){const r=Re(e);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(e){return Pe(e).toBase64()})(n.bytesValue):"referenceValue"in n?(function(e){return U.fromName(e).toString()})(n.referenceValue):"geoPointValue"in n?(function(e){return`geo(${e.latitude},${e.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(e){let r="[",s=!0;for(const o of e.values||[])s?s=!1:r+=",",r+=Ri(o);return r+"]"})(n.arrayValue):"mapValue"in n?(function(e){const r=Object.keys(e.fields||{}).sort();let s="{",o=!0;for(const a of r)o?o=!1:s+=",",s+=`${a}:${Ri(e.fields[a])}`;return s+"}"})(n.mapValue):F(61005,{value:n})}function Xr(n){switch(lt(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=wr(n);return t?16+Xr(t):16;case 5:return 2*n.stringValue.length;case 6:return Pe(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,o)=>s+Xr(o)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return We(r.fields,((o,a)=>{s+=o.length+Xr(a)})),s})(n.mapValue);default:throw F(13486,{value:n})}}function Jt(n){return!!n&&"integerValue"in n}function qe(n){return!!n&&"doubleValue"in n}function Se(n){return Jt(n)||qe(n)}function pn(n){return!!n&&"arrayValue"in n}function Bt(n){return!!n&&"nullValue"in n}function Lt(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function je(n){return!!n&&"mapValue"in n}function cs(n){var e,r;return((r=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[ic])==null?void 0:r.stringValue)===oc}function Pi(n){var t,e;return(e=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[ur])==null?void 0:e.arrayValue}function Wn(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const t={mapValue:{fields:{}}};return We(n.mapValue.fields,((e,r)=>t.mapValue.fields[e]=Wn(r))),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=Wn(n.arrayValue.values[e]);return t}return{...n}}function md(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===dd}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft{constructor(t){this.value=t}static empty(){return new Ft({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!je(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=Wn(e)}setAll(t){let e=ft.emptyPath(),r={},s=[];t.forEach(((a,c)=>{if(!e.isImmediateParentOf(c)){const h=this.getFieldsMap(e);this.applyChanges(h,r,s),r={},s=[],e=c.popLast()}a?r[c.lastSegment()]=Wn(a):s.push(c.lastSegment())}));const o=this.getFieldsMap(e);this.applyChanges(o,r,s)}delete(t){const e=this.field(t.popLast());je(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return zt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let s=e.mapValue.fields[t.get(r)];je(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,r){We(e,((s,o)=>t[s]=o));for(const s of r)delete t[s]}clone(){return new Ft(Wn(this.value))}}function ac(n){const t=[];return We(n.fields,((e,r)=>{const s=new ft([e]);if(je(r)){const o=ac(r.mapValue).fields;if(o.length===0)t.push(s);else for(const a of o)t.push(s.child(a))}else t.push(s)})),new Gt(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rs(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:or(t)?"-0":t}}function Ki(n){return{integerValue:""+n}}function Wi(n,t,e){return Number.isInteger(t)&&(e!=null&&e.preferIntegers)||id(t)?Ki(t):Rs(n,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ps{constructor(){this._=void 0}}function pd(n,t,e){return n instanceof ls?(function(s,o){const a={fields:{[nc]:{stringValue:ec},[sc]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return o&&Vs(o)&&(o=wr(o)),o&&(a.fields[rc]=o),{mapValue:a}})(e,t):n instanceof lr?cc(n,t):n instanceof hr?lc(n,t):n instanceof fr?(function(s,o){const a=uc(s,o),c=ds(a)+ds(s.Re);return Jt(a)&&Jt(s.Re)?Ki(c):Rs(s.serializer,c)})(n,t):n instanceof hs?(function(s,o){return Ja(s,o,Math.min)})(n,t):n instanceof fs?(function(s,o){return Ja(s,o,Math.max)})(n,t):void 0}function gd(n,t,e){return n instanceof lr?cc(n,t):n instanceof hr?lc(n,t):e}function uc(n,t){return n instanceof fr?Se(t)?t:{integerValue:0}:null}class ls extends Ps{}class lr extends Ps{constructor(t){super(),this.elements=t}}function cc(n,t){const e=hc(t);for(const r of n.elements)e.some((s=>zt(s,r)))||e.push(r);return{arrayValue:{values:e}}}class hr extends Ps{constructor(t){super(),this.elements=t}}function lc(n,t){let e=hc(t);for(const r of n.elements)e=e.filter((s=>!zt(s,r)));return{arrayValue:{values:e}}}class Yi extends Ps{constructor(t,e){super(),this.serializer=t,this.Re=e}}class fr extends Yi{}class hs extends Yi{}class fs extends Yi{}function Ja(n,t,e){if(!Se(t))return n.Re;const r=e(ds(t),ds(n.Re));return Jt(t)&&Jt(n.Re)?Ki(r):Rs(n.serializer,r)}function ds(n){return nt(n.integerValue||n.doubleValue)}function hc(n){return pn(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function _d(n,t){return n.field.isEqual(t.field)&&(function(r,s){return r instanceof lr&&s instanceof lr||r instanceof hr&&s instanceof hr?hn(r.elements,s.elements,zt):r instanceof fr&&s instanceof fr||r instanceof hs&&s instanceof hs||r instanceof fs&&s instanceof fs?zt(r.Re,s.Re):r instanceof ls&&s instanceof ls})(n.transform,t.transform)}class yd{constructor(t,e){this.version=t,this.transformResults=e}}class Xt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Xt}static exists(t){return new Xt(void 0,t)}static updateTime(t){return new Xt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Zr(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class Ss{}function fc(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new Ji(n.key,Xt.none()):new Ir(n.key,n.data,Xt.none());{const e=n.data,r=Ft.empty();let s=new ut(ft.comparator);for(let o of t.fields)if(!s.has(o)){let a=e.field(o);a===null&&o.length>1&&(o=o.popLast(),a=e.field(o)),a===null?r.delete(o):r.set(o,a),s=s.add(o)}return new Ye(n.key,r,new Gt(s.toArray()),Xt.none())}}function Ed(n,t,e){n instanceof Ir?(function(s,o,a){const c=s.value.clone(),h=Za(s.fieldTransforms,o,a.transformResults);c.setAll(h),o.convertToFoundDocument(a.version,c).setHasCommittedMutations()})(n,t,e):n instanceof Ye?(function(s,o,a){if(!Zr(s.precondition,o))return void o.convertToUnknownDocument(a.version);const c=Za(s.fieldTransforms,o,a.transformResults),h=o.data;h.setAll(dc(s)),h.setAll(c),o.convertToFoundDocument(a.version,h).setHasCommittedMutations()})(n,t,e):(function(s,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()})(0,t,e)}function Yn(n,t,e,r){return n instanceof Ir?(function(o,a,c,h){if(!Zr(o.precondition,a))return c;const f=o.value.clone(),m=tu(o.fieldTransforms,h,a);return f.setAll(m),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),null})(n,t,e,r):n instanceof Ye?(function(o,a,c,h){if(!Zr(o.precondition,a))return c;const f=tu(o.fieldTransforms,h,a),m=a.data;return m.setAll(dc(o)),m.setAll(f),a.convertToFoundDocument(a.version,m).setHasLocalMutations(),c===null?null:c.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map((p=>p.field)))})(n,t,e,r):(function(o,a,c){return Zr(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c})(n,t,e)}function Td(n,t){let e=null;for(const r of n.fieldTransforms){const s=t.data.field(r.field),o=uc(r.transform,s||null);o!=null&&(e===null&&(e=Ft.empty()),e.set(r.field,o))}return e||null}function Xa(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&hn(r,s,((o,a)=>_d(o,a)))})(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class Ir extends Ss{constructor(t,e,r,s=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Ye extends Ss{constructor(t,e,r,s,o=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=s,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function dc(n){const t=new Map;return n.fieldMask.fields.forEach((e=>{if(!e.isEmpty()){const r=n.data.field(e);t.set(e,r)}})),t}function Za(n,t,e){const r=new Map;M(n.length===e.length,32656,{Ie:e.length,Ae:n.length});for(let s=0;s<e.length;s++){const o=n[s],a=o.transform,c=t.data.field(o.field);r.set(o.field,gd(a,c,e[s]))}return r}function tu(n,t,e){const r=new Map;for(const s of n){const o=s.transform,a=e.data.field(s.field);r.set(s.field,pd(o,a,t))}return r}class Ji extends Ss{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class vd extends Ss{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ms{constructor(t,e){this.position=t,this.inclusive=e}}function eu(n,t,e){let r=0;for(let s=0;s<n.position.length;s++){const o=t[s],a=n.position[s];if(o.field.isKeyField()?r=U.comparator(U.fromName(a.referenceValue),e.key):r=Ot(a,e.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function nu(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!zt(n.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mc{}class dt extends mc{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new Id(t,e,r):e==="array-contains"?new Rd(t,r):e==="in"?new Pd(t,r):e==="not-in"?new Sd(t,r):e==="array-contains-any"?new Cd(t,r):new dt(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new Ad(t,r):new Vd(t,r)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(Ot(e,this.value)):e!==null&&lt(this.value)===lt(e)&&this.matchesComparison(Ot(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return F(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ne extends mc{constructor(t,e){super(),this.filters=t,this.op=e,this.Ve=null}static create(t,e){return new ne(t,e)}matches(t){return pc(this)?this.filters.find((e=>!e.matches(t)))===void 0:this.filters.find((e=>e.matches(t)))!==void 0}getFlattenedFilters(){return this.Ve!==null||(this.Ve=this.filters.reduce(((t,e)=>t.concat(e.getFlattenedFilters())),[])),this.Ve}getFilters(){return Object.assign([],this.filters)}}function pc(n){return n.op==="and"}function gc(n){return wd(n)&&pc(n)}function wd(n){for(const t of n.filters)if(t instanceof ne)return!1;return!0}function Si(n){if(n instanceof dt)return n.field.canonicalString()+n.op.toString()+mn(n.value);if(gc(n))return n.filters.map((t=>Si(t))).join(",");{const t=n.filters.map((e=>Si(e))).join(",");return`${n.op}(${t})`}}function _c(n,t){return n instanceof dt?(function(r,s){return s instanceof dt&&r.op===s.op&&r.field.isEqual(s.field)&&zt(r.value,s.value)})(n,t):n instanceof ne?(function(r,s){return s instanceof ne&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((o,a,c)=>o&&_c(a,s.filters[c])),!0):!1})(n,t):void F(19439)}function yc(n){return n instanceof dt?(function(e){return`${e.field.canonicalString()} ${e.op} ${mn(e.value)}`})(n):n instanceof ne?(function(e){return e.op.toString()+" {"+e.getFilters().map(yc).join(" ,")+"}"})(n):"Filter"}class Id extends dt{constructor(t,e,r){super(t,e,r),this.key=U.fromName(r.referenceValue)}matches(t){const e=U.comparator(t.key,this.key);return this.matchesComparison(e)}}class Ad extends dt{constructor(t,e){super(t,"in",e),this.keys=Ec("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class Vd extends dt{constructor(t,e){super(t,"not-in",e),this.keys=Ec("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function Ec(n,t){var e;return(((e=t.arrayValue)==null?void 0:e.values)||[]).map((r=>U.fromName(r.referenceValue)))}class Rd extends dt{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return pn(e)&&cr(e.arrayValue,this.value)}}class Pd extends dt{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&cr(this.value.arrayValue,e)}}class Sd extends dt{constructor(t,e){super(t,"not-in",e)}matches(t){if(cr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!cr(this.value.arrayValue,e)}}class Cd extends dt{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!pn(e)||!e.arrayValue.values)&&e.arrayValue.values.some((r=>cr(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ps{constructor(t,e="asc"){this.field=t,this.dir=e}}function bd(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vt{constructor(t,e,r,s,o,a,c){this.key=t,this.documentType=e,this.version=r,this.readTime=s,this.createTime=o,this.data=a,this.documentState=c}static newInvalidDocument(t){return new Vt(t,0,q.min(),q.min(),q.min(),Ft.empty(),0)}static newFoundDocument(t,e,r,s){return new Vt(t,1,e,q.min(),r,s,0)}static newNoDocument(t,e){return new Vt(t,2,e,q.min(),q.min(),Ft.empty(),0)}static newUnknownDocument(t,e){return new Vt(t,3,e,q.min(),q.min(),Ft.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(q.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=Ft.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=Ft.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=q.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof Vt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new Vt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xd{constructor(t,e=null,r=[],s=[],o=null,a=null,c=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=s,this.limit=o,this.startAt=a,this.endAt=c,this.de=null}}function ru(n,t=null,e=[],r=[],s=null,o=null,a=null){return new xd(n,t,e,r,s,o,a)}function Tc(n){const t=j(n);if(t.de===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map((r=>Si(r))).join(","),e+="|ob:",e+=t.orderBy.map((r=>(function(o){return o.field.canonicalString()+o.dir})(r))).join(","),As(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map((r=>mn(r))).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map((r=>mn(r))).join(",")),t.de=e}return t.de}function vc(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!bd(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!_c(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!nu(n.startAt,t.startAt)&&nu(n.endAt,t.endAt)}function $e(n){return!!n.isCorePipeline}function wc(n){return!!n.path&&U.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cs{constructor(t,e=null,r=[],s=[],o=null,a="F",c=null,h=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=s,this.limit=o,this.limitType=a,this.startAt=c,this.endAt=h,this.fe=null,this.me=null,this.pe=null,this.startAt,this.endAt}}function Dd(n,t,e,r,s,o,a,c){return new Cs(n,t,e,r,s,o,a,c)}function Xi(n){return new Cs(n)}function su(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Nd(n){return U.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function kd(n){return n.collectionGroup!==null}function Jn(n){const t=j(n);if(t.fe===null){t.fe=[];const e=new Set;for(const o of t.explicitOrderBy)t.fe.push(o),e.add(o.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new ut(ft.comparator);return a.filters.forEach((h=>{h.getFlattenedFilters().forEach((f=>{f.isInequality()&&(c=c.add(f.field))}))})),c})(t).forEach((o=>{e.has(o.canonicalString())||o.isKeyField()||t.fe.push(new ps(o,r))})),e.has(ft.keyField().canonicalString())||t.fe.push(new ps(ft.keyField(),r))}return t.fe}function Zt(n){const t=j(n);return t.me||(t.me=Od(t,Jn(n))),t.me}function Od(n,t){if(n.limitType==="F")return ru(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map((s=>{const o=s.dir==="desc"?"asc":"desc";return new ps(s.field,o)}));const e=n.endAt?new ms(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new ms(n.startAt.position,n.startAt.inclusive):null;return ru(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function Ci(n,t,e){return new Cs(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function Ld(n,t){return vc(Zt(n),Zt(t))&&n.limitType===t.limitType}function Xn(n){return`Query(target=${(function(e){let r=e.path.canonicalString();return e.collectionGroup!==null&&(r+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(r+=`, filters: [${e.filters.map((s=>yc(s))).join(", ")}]`),As(e.limit)||(r+=", limit: "+e.limit),e.orderBy.length>0&&(r+=`, orderBy: [${e.orderBy.map((s=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(s))).join(", ")}]`),e.startAt&&(r+=", startAt: ",r+=e.startAt.inclusive?"b:":"a:",r+=e.startAt.position.map((s=>mn(s))).join(",")),e.endAt&&(r+=", endAt: ",r+=e.endAt.inclusive?"a:":"b:",r+=e.endAt.position.map((s=>mn(s))).join(",")),`Target(${r})`})(Zt(n))}; limitType=${n.limitType})`}function bs(n,t){return t.isFoundDocument()&&(function(r,s){const o=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):U.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)})(n,t)&&(function(r,s){for(const o of Jn(r))if(!o.field.isKeyField()&&s.data.field(o.field)===null)return!1;return!0})(n,t)&&(function(r,s){for(const o of r.filters)if(!o.matches(s))return!1;return!0})(n,t)&&(function(r,s){return!(r.startAt&&!(function(a,c,h){const f=eu(a,c,h);return a.inclusive?f<=0:f<0})(r.startAt,Jn(r),s)||r.endAt&&!(function(a,c,h){const f=eu(a,c,h);return a.inclusive?f>=0:f>0})(r.endAt,Jn(r),s))})(n,t)}function Zi(n){return(t,e)=>{let r=!1;for(const s of Jn(n)){const o=Md(s,t,e);if(o!==0)return o;r=r||s.field.isKeyField()}return 0}}function Md(n,t,e){const r=n.field.isKeyField()?U.comparator(t.key,e.key):(function(o,a,c){const h=a.data.field(o),f=c.data.field(o);return h!==null&&f!==null?Ot(h,f):F(42886)})(n.field,t,e);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return F(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ud{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var it,K;function Fd(n){switch(n){case b.OK:return F(64938);case b.CANCELLED:case b.UNKNOWN:case b.DEADLINE_EXCEEDED:case b.RESOURCE_EXHAUSTED:case b.INTERNAL:case b.UNAVAILABLE:case b.UNAUTHENTICATED:return!1;case b.INVALID_ARGUMENT:case b.NOT_FOUND:case b.ALREADY_EXISTS:case b.PERMISSION_DENIED:case b.FAILED_PRECONDITION:case b.ABORTED:case b.OUT_OF_RANGE:case b.UNIMPLEMENTED:case b.DATA_LOSS:return!0;default:return F(15467,{code:n})}}function Ic(n){if(n===void 0)return le("GRPC error has no .code"),b.UNKNOWN;switch(n){case it.OK:return b.OK;case it.CANCELLED:return b.CANCELLED;case it.UNKNOWN:return b.UNKNOWN;case it.DEADLINE_EXCEEDED:return b.DEADLINE_EXCEEDED;case it.RESOURCE_EXHAUSTED:return b.RESOURCE_EXHAUSTED;case it.INTERNAL:return b.INTERNAL;case it.UNAVAILABLE:return b.UNAVAILABLE;case it.UNAUTHENTICATED:return b.UNAUTHENTICATED;case it.INVALID_ARGUMENT:return b.INVALID_ARGUMENT;case it.NOT_FOUND:return b.NOT_FOUND;case it.ALREADY_EXISTS:return b.ALREADY_EXISTS;case it.PERMISSION_DENIED:return b.PERMISSION_DENIED;case it.FAILED_PRECONDITION:return b.FAILED_PRECONDITION;case it.ABORTED:return b.ABORTED;case it.OUT_OF_RANGE:return b.OUT_OF_RANGE;case it.UNIMPLEMENTED:return b.UNIMPLEMENTED;case it.DATA_LOSS:return b.DATA_LOSS;default:return F(39323,{code:n})}}(K=it||(it={}))[K.OK=0]="OK",K[K.CANCELLED=1]="CANCELLED",K[K.UNKNOWN=2]="UNKNOWN",K[K.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",K[K.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",K[K.NOT_FOUND=5]="NOT_FOUND",K[K.ALREADY_EXISTS=6]="ALREADY_EXISTS",K[K.PERMISSION_DENIED=7]="PERMISSION_DENIED",K[K.UNAUTHENTICATED=16]="UNAUTHENTICATED",K[K.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",K[K.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",K[K.ABORTED=10]="ABORTED",K[K.OUT_OF_RANGE=11]="OUT_OF_RANGE",K[K.UNIMPLEMENTED=12]="UNIMPLEMENTED",K[K.INTERNAL=13]="INTERNAL",K[K.UNAVAILABLE=14]="UNAVAILABLE",K[K.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r!==void 0){for(const[s,o]of r)if(this.equalsFn(s,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const r=this.mapKeyFn(t),s=this.inner[r];if(s===void 0)return this.inner[r]=[[t,e]],void this.innerSize++;for(let o=0;o<s.length;o++)if(this.equalsFn(s[o][0],t))return void(s[o]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],t))return r.length===1?delete this.inner[e]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(t){We(this.inner,((e,r)=>{for(const[s,o]of r)t(s,o)}))}isEmpty(){return Zu(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bd=new et(U.comparator);function Dt(){return Bd}const Ac=new et(U.comparator);function sn(...n){let t=Ac;for(const e of n)t=t.insert(e.key,e);return t}function Vc(n){let t=Ac;return n.forEach(((e,r)=>t=t.insert(e,r.overlayedDocument))),t}function ye(){return Zn()}function Rc(){return Zn()}function Zn(){return new Je((n=>n.toString()),((n,t)=>n.isEqual(t)))}const $d=new et(U.comparator),qd=new ut(U.comparator);function G(...n){let t=qd;for(const e of n)t=t.add(e);return t}const jd=new ut(H);function zd(){return jd}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gd(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hd=new Te([4294967295,4294967295],0);function iu(n){const t=Gd().encode(n),e=new ju;return e.update(t),new Uint8Array(e.digest())}function ou(n){const t=new DataView(n.buffer),e=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new Te([e,r],0),new Te([s,o],0)]}class to{constructor(t,e,r){if(this.bitmap=t,this.padding=e,this.hashCount=r,e<0||e>=8)throw new Hn(`Invalid padding: ${e}`);if(r<0)throw new Hn(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new Hn(`Invalid hash count: ${r}`);if(t.length===0&&e!==0)throw new Hn(`Invalid padding when bitmap length is 0: ${e}`);this.ge=8*t.length-e,this.ye=Te.fromNumber(this.ge)}we(t,e,r){let s=t.add(e.multiply(Te.fromNumber(r)));return s.compare(Hd)===1&&(s=new Te([s.getBits(0),s.getBits(1)],0)),s.modulo(this.ye).toNumber()}be(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.ge===0)return!1;const e=iu(t),[r,s]=ou(e);for(let o=0;o<this.hashCount;o++){const a=this.we(r,s,o);if(!this.be(a))return!1}return!0}static create(t,e,r){const s=t%8==0?0:8-t%8,o=new Uint8Array(Math.ceil(t/8)),a=new to(o,s,e);return r.forEach((c=>a.insert(c))),a}insert(t){if(this.ge===0)return;const e=iu(t),[r,s]=ou(e);for(let o=0;o<this.hashCount;o++){const a=this.we(r,s,o);this.ve(a)}}ve(t){const e=Math.floor(t/8),r=t%8;this.bitmap[e]|=1<<r}}class Hn extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ar{constructor(t,e,r,s,o,a){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=r,this.documentUpdates=s,this.augmentedDocumentUpdates=o,this.resolvedLimboDocuments=a}static createSynthesizedRemoteEventForCurrentChange(t,e,r){const s=new Map;return s.set(t,Vr.createSynthesizedTargetChangeForCurrentChange(t,e,r)),new Ar(q.min(),s,new et(H),Dt(),Dt(),G())}}class Vr{constructor(t,e,r,s,o){this.resumeToken=t,this.current=e,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(t,e,r){return new Vr(r,e,G(),G(),G())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ts{constructor(t,e,r,s){this.Se=t,this.removedTargetIds=e,this.key=r,this.De=s}}class Pc{constructor(t,e){this.targetId=t,this.xe=e}}class Sc{constructor(t,e,r=ct.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=r,this.cause=s}}class au{constructor(t){this.targetId=t,this.Ce=0,this.Fe=uu(),this.Oe=ct.EMPTY_BYTE_STRING,this.Me=!1,this.Ne=!0}get current(){return this.Me}get resumeToken(){return this.Oe}get Le(){return this.Ce!==0}get Be(){return this.Ne}Ue(t){t.approximateByteSize()>0&&(this.Ne=!0,this.Oe=t)}ke(){let t=G(),e=G(),r=G();return this.Fe.forEach(((s,o)=>{switch(o){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:r=r.add(s);break;default:F(38017,{changeType:o})}})),new Vr(this.Oe,this.Me,t,e,r)}qe(){this.Ne=!1,this.Fe=uu()}$e(t,e){this.Ne=!0,this.Fe=this.Fe.insert(t,e)}Ke(t){this.Ne=!0,this.Fe=this.Fe.remove(t)}We(){this.Ce+=1}Qe(){this.Ce-=1,M(this.Ce>=0,3241,{Ce:this.Ce,targetId:this.targetId})}Ge(){this.Ne=!0,this.Me=!0}}const jn="WatchChangeAggregator";class Qd{constructor(t){this.ze=t,this.je=new Map,this.He=Dt(),this.Je=Kr(),this.Ye=Dt(),this.Ze=Kr(),this.Xe=new et(H)}et(t){for(const e of t.Se)t.De&&t.De.isFoundDocument()?this.tt(e,t.De):this.nt(e,t.key,t.De);for(const e of t.removedTargetIds)this.nt(e,t.key,t.De)}rt(t){this.forEachTarget(t,(e=>{const r=this.je.get(e);if(r)switch(t.state){case 0:this.it(e)&&r.Ue(t.resumeToken);break;case 1:r.Qe(),r.Le||r.qe(),r.Ue(t.resumeToken);break;case 2:r.Qe(),r.Le||this.removeTarget(e);break;case 3:this.it(e)&&(r.Ge(),r.Ue(t.resumeToken));break;case 4:this.it(e)&&(this.st(e),r.Ue(t.resumeToken));break;default:F(56790,{state:t.state})}else k(jn,`handleTargetChange received targetChange for untracked target ID (${e}) with state (${t.state})`)}))}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.je.forEach(((r,s)=>{this.it(s)&&e(s)}))}_t(t){var e;return $e(t)?t.getPipelineSourceType()==="documents"&&((e=t.getPipelineDocuments())==null?void 0:e.length)===1:wc(t)}ot(t){const e=t.targetId,r=t.xe.count,s=this.ut(e);if(s){const o=s.target;if(this._t(o))if(r===0){const a=new U($e(o)?Y.fromString(o.getPipelineDocuments()[0]):o.path);this.nt(e,a,Vt.newNoDocument(a,q.min()))}else M(r===1,20013,"Single document existence filter with count: "+r);else{const a=this.ct(e);if(a!==r){const c=this.lt(t),h=c?this.Et(c,t,a):1;if(h!==0){this.st(e);const f=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Xe=this.Xe.insert(e,f)}}}}}lt(t){const e=t.xe.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:o=0}=e;let a,c;try{a=Pe(r).toUint8Array()}catch(h){if(h instanceof tc)return Ht("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{c=new to(a,s,o)}catch(h){return Ht(h instanceof Hn?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return c.ge===0?null:c}Et(t,e,r){return e.xe.count===r-this.Pt(t,e.targetId)?0:2}Pt(t,e){const r=this.ze.getRemoteKeysForTarget(e);let s=0;return r.forEach((o=>{const a=this.ze.Tt(),c=`projects/${a.projectId}/databases/${a.database}/documents/${o.path.canonicalString()}`;t.mightContain(c)||(this.nt(e,o,null),s++)})),s}Rt(t){const e=new Map;this.je.forEach(((o,a)=>{const c=this.ut(a);if(c){if(o.current&&this._t(c.target)){const h=$e(c.target)?Y.fromString(c.target.getPipelineDocuments()[0]):c.target.path,f=new U(h);this.It(f).has(a)||this.At(a,f)||this.nt(a,f,Vt.newNoDocument(f,t))}o.Be&&(e.set(a,o.ke()),o.qe())}}));let r=G();this.Ze.forEach(((o,a)=>{let c=!0;a.forEachWhile((h=>{const f=this.ut(h);return!f||f.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(r=r.add(o))})),this.He.forEach(((o,a)=>a.setReadTime(t))),this.Ye.forEach(((o,a)=>a.setReadTime(t)));const s=new Ar(t,e,this.Xe,this.He,this.Ye,r);return this.He=Dt(),this.Je=Kr(),this.Ye=Dt(),this.Ze=Kr(),this.Xe=new et(H),s}tt(t,e){const r=this.je.get(t);if(!r||!this.it(t))return void k(jn,`addDocumentToTarget received document for unknown inactive target (${t})`);const s=this.At(t,e.key)?2:0;r.$e(e.key,s),$e(this.ut(t).target)&&this.ut(t).target.getPipelineFlavor()!=="exact"?this.Ye=this.Ye.insert(e.key,e):this.He=this.He.insert(e.key,e),this.Je=this.Je.insert(e.key,this.It(e.key).add(t)),this.Ze=this.Ze.insert(e.key,this.Vt(e.key).add(t))}nt(t,e,r){const s=this.je.get(t);s&&this.it(t)?(this.At(t,e)?s.$e(e,1):s.Ke(e),this.Ze=this.Ze.insert(e,this.Vt(e).delete(t)),this.Ze=this.Ze.insert(e,this.Vt(e).add(t)),r&&($e(this.ut(t).target)&&this.ut(t).target.getPipelineFlavor()!=="exact"?this.Ye=this.Ye.insert(e,r):this.He=this.He.insert(e,r))):k(jn,`removeDocumentFromTarget received document for unknown or inactive target (${t})`)}removeTarget(t){this.je.delete(t)}ct(t){const e=this.je.get(t);if(!e)return 0;const r=e.ke();return this.ze.getRemoteKeysForTarget(t).size+r.addedDocuments.size-r.removedDocuments.size}We(t){let e=this.je.get(t);e||(k(jn,`recordPendingTargetRequest set up tracking for target ID ${t}`),e=new au(t),this.je.set(t,e)),e.We()}Vt(t){let e=this.Ze.get(t);return e||(e=new ut(H),this.Ze=this.Ze.insert(t,e)),e}It(t){let e=this.Je.get(t);return e||(e=new ut(H),this.Je=this.Je.insert(t,e)),e}it(t){const e=this.ut(t)!==null;return e||k(jn,"Detected inactive target",t),e}ut(t){const e=this.je.get(t);return e===void 0||e.Le?null:this.ze.dt(t)}st(t){this.je.set(t,new au(t)),this.ze.getRemoteKeysForTarget(t).forEach((e=>{this.nt(t,e,null)}))}At(t,e){return this.ze.getRemoteKeysForTarget(t).has(e)}}function Kr(){return new et(U.comparator)}function uu(){return new et(U.comparator)}const Kd={asc:"ASCENDING",desc:"DESCENDING"},Wd={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Yd={and:"AND",or:"OR"};class Jd{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function bi(n,t){return n.useProto3Json||As(t)?t:{value:t}}function gs(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function eo(n){const t=Re(n);return new tt(t.seconds,t.nanos)}function Cc(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function es(n,t){return gs(n,t.toTimestamp())}function te(n){return M(!!n,49232),q.fromTimestamp(eo(n))}function no(n,t){return xi(n,t).canonicalString()}function xi(n,t){const e=(function(s){return new Y(["projects",s.projectId,"databases",s.database])})(n).child("documents");return t===void 0?e:e.child(t)}function bc(n){const t=Y.fromString(n);return M(Oc(t),10190,{key:t.toString()}),t}function _s(n,t){return no(n.databaseId,t.path)}function pi(n,t){const e=bc(t);if(e.get(1)!==n.databaseId.projectId)throw new O(b.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new O(b.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new U(Dc(e))}function xc(n,t){return no(n.databaseId,t)}function Xd(n){const t=bc(n);return t.length===4?Y.emptyPath():Dc(t)}function Di(n){return new Y(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Dc(n){return M(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function cu(n,t,e){return{name:_s(n,t),fields:e.value.mapValue.fields}}function Zd(n,t){let e;if("targetChange"in t){t.targetChange;const r=(function(f){return f==="NO_CHANGE"?0:f==="ADD"?1:f==="REMOVE"?2:f==="CURRENT"?3:f==="RESET"?4:F(39313,{state:f})})(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],o=(function(f,m){return f.useProto3Json?(M(m===void 0||typeof m=="string",58123),ct.fromBase64String(m||"")):(M(m===void 0||m instanceof Buffer||m instanceof Uint8Array,16193),ct.fromUint8Array(m||new Uint8Array))})(n,t.targetChange.resumeToken),a=t.targetChange.cause,c=a&&(function(f){const m=f.code===void 0?b.UNKNOWN:Ic(f.code);return new O(m,f.message||"")})(a);e=new Sc(r,s,o,c||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=pi(n,r.document.name),o=te(r.document.updateTime),a=r.document.createTime?te(r.document.createTime):q.min(),c=new Ft({mapValue:{fields:r.document.fields}}),h=Vt.newFoundDocument(s,o,a,c),f=r.targetIds||[],m=r.removedTargetIds||[];e=new ts(f,m,h.key,h)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=pi(n,r.document),o=r.readTime?te(r.readTime):q.min(),a=Vt.newNoDocument(s,o),c=r.removedTargetIds||[];e=new ts([],c,a.key,a)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=pi(n,r.document),o=r.removedTargetIds||[];e=new ts([],o,s,null)}else{if(!("filter"in t))return F(11601,{ft:t});{t.filter;const r=t.filter;r.targetId;const{count:s=0,unchangedNames:o}=r,a=new Ud(s,o),c=r.targetId;e=new Pc(c,a)}}return e}function tm(n,t){let e;if(t instanceof Ir)e={update:cu(n,t.key,t.value)};else if(t instanceof Ji)e={delete:_s(n,t.key)};else if(t instanceof Ye)e={update:cu(n,t.key,t.data),updateMask:lm(t.fieldMask)};else{if(!(t instanceof vd))return F(16599,{gt:t.type});e={verify:_s(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map((r=>(function(o,a){const c=a.transform;if(c instanceof ls)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof lr)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof hr)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof fr)return{fieldPath:a.field.canonicalString(),increment:c.Re};if(c instanceof hs)return{fieldPath:a.field.canonicalString(),minimum:c.Re};if(c instanceof fs)return{fieldPath:a.field.canonicalString(),maximum:c.Re};throw F(20930,{transform:a.transform})})(0,r)))),t.precondition.isNone||(e.currentDocument=(function(s,o){return o.updateTime!==void 0?{updateTime:es(s,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:F(27497)})(n,t.precondition)),e}function em(n,t){return n&&n.length>0?(M(t!==void 0,14353),n.map((e=>(function(s,o){let a=s.updateTime?te(s.updateTime):te(o);return a.isEqual(q.min())&&(a=te(o)),new yd(a,s.transformResults||[])})(e,t)))):[]}function nm(n,t){return{documents:[xc(n,t.path)]}}function rm(n,t){const e={structuredQuery:{}},r=t.path;let s;t.collectionGroup!==null?(s=r,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),e.structuredQuery.from=[{collectionId:r.lastSegment()}]),e.parent=xc(n,s);const o=(function(f){if(f.length!==0)return kc(ne.create(f,"and"))})(t.filters);o&&(e.structuredQuery.where=o);const a=(function(f){if(f.length!==0)return f.map((m=>(function(V){return{field:on(V.field),direction:am(V.dir)}})(m)))})(t.orderBy);a&&(e.structuredQuery.orderBy=a);const c=bi(n,t.limit);return c!==null&&(e.structuredQuery.limit=c),t.startAt&&(e.structuredQuery.startAt=(function(f){return{before:f.inclusive,values:f.position}})(t.startAt)),t.endAt&&(e.structuredQuery.endAt=(function(f){return{before:!f.inclusive,values:f.position}})(t.endAt)),{yt:e,parent:s}}function sm(n){let t=Xd(n.parent);const e=n.structuredQuery,r=e.from?e.from.length:0;let s=null;if(r>0){M(r===1,65062);const m=e.from[0];m.allDescendants?s=m.collectionId:t=t.child(m.collectionId)}let o=[];e.where&&(o=(function(p){const V=Nc(p);return V instanceof ne&&gc(V)?V.getFilters():[V]})(e.where));let a=[];e.orderBy&&(a=(function(p){return p.map((V=>(function(x){return new ps(an(x.field),(function(L){switch(L){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(x.direction))})(V)))})(e.orderBy));let c=null;e.limit&&(c=(function(p){let V;return V=typeof p=="object"?p.value:p,As(V)?null:V})(e.limit));let h=null;e.startAt&&(h=(function(p){const V=!!p.before,C=p.values||[];return new ms(C,V)})(e.startAt));let f=null;return e.endAt&&(f=(function(p){const V=!p.before,C=p.values||[];return new ms(C,V)})(e.endAt)),Dd(t,s,a,o,c,"F",h,f)}function im(n,t){const e=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return F(28987,{purpose:s})}})(t.purpose);return e==null?null:{"goog-listen-tags":e}}function om(n,t){return{structuredPipeline:{pipeline:{stages:t.stages.map((e=>e._toProto(n)))}}}}function Nc(n){return n.unaryFilter!==void 0?(function(e){switch(e.unaryFilter.op){case"IS_NAN":const r=an(e.unaryFilter.field);return dt.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=an(e.unaryFilter.field);return dt.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=an(e.unaryFilter.field);return dt.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=an(e.unaryFilter.field);return dt.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return F(61313);default:return F(60726)}})(n):n.fieldFilter!==void 0?(function(e){return dt.create(an(e.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return F(58110);default:return F(50506)}})(e.fieldFilter.op),e.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(e){return ne.create(e.compositeFilter.filters.map((r=>Nc(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return F(1026)}})(e.compositeFilter.op))})(n):F(30097,{filter:n})}function am(n){return Kd[n]}function um(n){return Wd[n]}function cm(n){return Yd[n]}function on(n){return{fieldPath:n.canonicalString()}}function an(n){return ft.fromServerFormat(n.fieldPath)}function kc(n){return n instanceof dt?(function(e){if(e.op==="=="){if(Lt(e.value))return{unaryFilter:{field:on(e.field),op:"IS_NAN"}};if(Bt(e.value))return{unaryFilter:{field:on(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(Lt(e.value))return{unaryFilter:{field:on(e.field),op:"IS_NOT_NAN"}};if(Bt(e.value))return{unaryFilter:{field:on(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:on(e.field),op:um(e.op),value:e.value}}})(n):n instanceof ne?(function(e){const r=e.getFilters().map((s=>kc(s)));return r.length===1?r[0]:{compositeFilter:{op:cm(e.op),filters:r}}})(n):F(54877,{filter:n})}function lm(n){const t=[];return n.fields.forEach((e=>t.push(e.canonicalString()))),{fieldPaths:t}}function Oc(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function Lc(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}function dr(n,t){const e={fields:{}};return t.forEach(((r,s)=>{if(typeof s!="string")throw new Error(`Cannot encode map with non-string key: ${s}`);e.fields[s]=r._toProto(n)})),{mapValue:e}}function Mc(n){return{stringValue:n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xs(n){return new Jd(n,!0)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jt{constructor(t){this._byteString=t}static fromBase64String(t){try{return new jt(ct.fromBase64String(t))}catch(e){throw new O(b.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new jt(ct.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:jt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(vr(t,jt._jsonSchema))return jt.fromBase64String(t.bytes)}}jt._jsonSchemaVersion="firestore/bytes/1.0",jt._jsonSchema={type:ot("string",jt._jsonSchemaVersion),bytes:ot("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ro{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new O(b.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ft(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}function hm(){return new ro(Yt)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uc{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ee{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new O(b.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new O(b.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return H(this._lat,t._lat)||H(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:ee._jsonSchemaVersion}}static fromJSON(t){if(vr(t,ee._jsonSchema))return new ee(t.latitude,t.longitude)}}function Fc(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ee._jsonSchemaVersion="firestore/geoPoint/1.0",ee._jsonSchema={type:ot("string",ee._jsonSchemaVersion),latitude:ot("number"),longitude:ot("number")};class fm{bt(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lu="ConnectivityMonitor";class hu{constructor(){this.vt=()=>this.St(),this.Dt=()=>this.xt(),this.Ct=[],this.Ft()}bt(t){this.Ct.push(t)}shutdown(){window.removeEventListener("online",this.vt),window.removeEventListener("offline",this.Dt)}Ft(){window.addEventListener("online",this.vt),window.addEventListener("offline",this.Dt)}St(){k(lu,"Network connectivity changed: AVAILABLE");for(const t of this.Ct)t(0)}xt(){k(lu,"Network connectivity changed: UNAVAILABLE");for(const t of this.Ct)t(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Wr=null;function Ni(){return Wr===null?Wr=(function(){return 268435456+Math.round(2147483648*Math.random())})():Wr++,"0x"+Wr.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gi="RestConnection",dm={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class mm{get Ot(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Mt=e+"://"+t.host,this.Nt=`projects/${r}/databases/${s}`,this.Lt=this.databaseId.database===us?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Bt(t,e,r,s,o){const a=Ni(),c=this.Ut(t,e.toUriEncodedString());k(gi,`Sending RPC '${t}' ${a}:`,c,r);const h={"google-cloud-resource-prefix":this.Nt,"x-goog-request-params":this.Lt};this.kt(h,s,o);const{host:f}=new URL(c),m=Fu(f);return this.qt(t,c,h,r,m).then((p=>(k(gi,`Received RPC '${t}' ${a}: `,p),p)),(p=>{throw Ht(gi,`RPC '${t}' ${a} failed with error: `,p,"url: ",c,"request:",r),p}))}$t(t,e,r,s,o,a){return this.Bt(t,e,r,s,o)}kt(t,e,r){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+En})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach(((s,o)=>t[o]=s)),r&&r.headers.forEach(((s,o)=>t[o]=s))}Ut(t,e){const r=dm[t];let s=`${this.Mt}/v1/${e}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pm{constructor(t){this.Kt=t.Kt,this.Wt=t.Wt}Qt(t){this.Gt=t}zt(t){this.jt=t}Ht(t){this.Jt=t}onMessage(t){this.Yt=t}close(){this.Wt()}send(t){this.Kt(t)}Zt(){this.Gt()}Xt(){this.jt()}en(t){this.Jt(t)}tn(t){this.Yt(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const It="WebChannelConnection",zn=(n,t,e)=>{n.listen(t,(r=>{try{e(r)}catch(s){setTimeout((()=>{throw s}),0)}}))};class cn extends mm{constructor(t){super(t),this.nn=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}static rn(){if(!cn.sn){const t=Qu();zn(t,Hu.STAT_EVENT,(e=>{e.stat===Ai.PROXY?k(It,"STAT_EVENT: detected buffering proxy"):e.stat===Ai.NOPROXY&&k(It,"STAT_EVENT: detected no buffering proxy")})),cn.sn=!0}}qt(t,e,r,s,o){const a=Ni();return new Promise(((c,h)=>{const f=new zu;f.setWithCredentials(!0),f.listenOnce(Gu.COMPLETE,(()=>{try{switch(f.getLastErrorCode()){case Jr.NO_ERROR:const p=f.getResponseJson();k(It,`XHR for RPC '${t}' ${a} received:`,JSON.stringify(p)),c(p);break;case Jr.TIMEOUT:k(It,`RPC '${t}' ${a} timed out`),h(new O(b.DEADLINE_EXCEEDED,"Request time out"));break;case Jr.HTTP_ERROR:const V=f.getStatus();if(k(It,`RPC '${t}' ${a} failed with status:`,V,"response text:",f.getResponseText()),V>0){let C=f.getResponseJson();Array.isArray(C)&&(C=C[0]);const x=C==null?void 0:C.error;if(x&&x.status&&x.message){const B=(function(Q){const J=Q.toLowerCase().replace(/_/g,"-");return Object.values(b).indexOf(J)>=0?J:b.UNKNOWN})(x.status);h(new O(B,x.message))}else h(new O(b.UNKNOWN,"Server responded with status "+f.getStatus()))}else h(new O(b.UNAVAILABLE,"Connection failed."));break;default:F(9055,{_n:t,streamId:a,an:f.getLastErrorCode(),un:f.getLastError()})}}finally{k(It,`RPC '${t}' ${a} completed.`)}}));const m=JSON.stringify(s);k(It,`RPC '${t}' ${a} sending request:`,s),f.send(e,"POST",m,r,15)}))}cn(t,e,r){const s=Ni(),o=[this.Mt,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(c.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(c.useFetchStreams=!0),this.kt(c.initMessageHeaders,e,r),c.encodeInitMessageHeaders=!0;const f=o.join("");k(It,`Creating RPC '${t}' stream ${s}: ${f}`,c);const m=a.createWebChannel(f,c);this.En(m);let p=!1,V=!1;const C=new pm({Kt:x=>{V?k(It,`Not sending because RPC '${t}' stream ${s} is closed:`,x):(p||(k(It,`Opening RPC '${t}' stream ${s} transport.`),m.open(),p=!0),k(It,`RPC '${t}' stream ${s} sending:`,x),m.send(x))},Wt:()=>m.close()});return zn(m,Gn.EventType.OPEN,(()=>{V||(k(It,`RPC '${t}' stream ${s} transport opened.`),C.Zt())})),zn(m,Gn.EventType.CLOSE,(()=>{V||(V=!0,k(It,`RPC '${t}' stream ${s} transport closed`),C.en(),this.hn(m))})),zn(m,Gn.EventType.ERROR,(x=>{V||(V=!0,Ht(It,`RPC '${t}' stream ${s} transport errored. Name:`,x.name,"Message:",x.message),C.en(new O(b.UNAVAILABLE,"The operation could not be completed")))})),zn(m,Gn.EventType.MESSAGE,(x=>{var B;if(!V){const L=x.data[0];M(!!L,16349);const Q=L,J=(Q==null?void 0:Q.error)||((B=Q[0])==null?void 0:B.error);if(J){k(It,`RPC '${t}' stream ${s} received error:`,J);const rt=J.status;let qt=(function(v){const g=it[v];if(g!==void 0)return Ic(g)})(rt),Tt=J.message;rt==="NOT_FOUND"&&Tt.includes("database")&&Tt.includes("does not exist")&&Tt.includes(this.databaseId.database)&&Ht(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),qt===void 0&&(qt=b.INTERNAL,Tt="Unknown error status: "+rt+" with message "+J.message),V=!0,C.en(new O(qt,Tt)),m.close()}else k(It,`RPC '${t}' stream ${s} received:`,L),C.tn(L)}})),cn.rn(),setTimeout((()=>{C.Xt()}),0),C}terminate(){this.nn.forEach((t=>t.close())),this.nn=[]}En(t){this.nn.push(t)}hn(t){this.nn=this.nn.filter((e=>e===t))}kt(t,e,r){super.kt(t,e,r),this.databaseInfo.apiKey&&(t["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Ku()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gm(n){return new cn(n)}cn.sn=!1;class Bc{constructor(t,e,r=1e3,s=1.5,o=6e4){this.Tn=t,this.timerId=e,this.Pn=r,this.Rn=s,this.In=o,this.An=0,this.Vn=null,this.dn=Date.now(),this.reset()}reset(){this.An=0}fn(){this.An=this.In}mn(t){this.cancel();const e=Math.floor(this.An+this.pn()),r=Math.max(0,Date.now()-this.dn),s=Math.max(0,e-r);s>0&&k("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.An} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.Vn=this.Tn.enqueueAfterDelay(this.timerId,s,(()=>(this.dn=Date.now(),t()))),this.An*=this.Rn,this.An<this.Pn&&(this.An=this.Pn),this.An>this.In&&(this.An=this.In)}gn(){this.Vn!==null&&(this.Vn.skipDelay(),this.Vn=null)}cancel(){this.Vn!==null&&(this.Vn.cancel(),this.Vn=null)}pn(){return(Math.random()-.5)*this.An}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fu="PersistentStream";class $c{constructor(t,e,r,s,o,a,c,h){this.Tn=t,this.yn=r,this.wn=s,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=h,this.state=0,this.bn=0,this.vn=null,this.Sn=null,this.stream=null,this.Dn=0,this.xn=new Bc(t,e)}Cn(){return this.state===1||this.state===5||this.Fn()}Fn(){return this.state===2||this.state===3}start(){this.Dn=0,this.state!==4?this.auth():this.On()}async stop(){this.Cn()&&await this.close(0)}Mn(){this.state=0,this.xn.reset()}Nn(){this.Fn()&&this.vn===null&&(this.vn=this.Tn.enqueueAfterDelay(this.yn,6e4,(()=>this.Ln())))}Bn(t){this.Un(),this.stream.send(t)}async Ln(){if(this.Fn())return this.close(0)}Un(){this.vn&&(this.vn.cancel(),this.vn=null)}kn(){this.Sn&&(this.Sn.cancel(),this.Sn=null)}async close(t,e){this.Un(),this.kn(),this.xn.cancel(),this.bn++,t!==4?this.xn.reset():e&&e.code===b.RESOURCE_EXHAUSTED?(le(e.toString()),le("Using maximum backoff delay to prevent overloading the backend."),this.xn.fn()):e&&e.code===b.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.qn(),this.stream.close(),this.stream=null),this.state=t,await this.listener.Ht(e)}qn(){}auth(){this.state=1;const t=this.$n(this.bn),e=this.bn;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.bn===e&&this.Kn(r,s)}),(r=>{t((()=>{const s=new O(b.UNKNOWN,"Fetching auth token failed: "+r.message);return this.Wn(s)}))}))}Kn(t,e){const r=this.$n(this.bn);this.stream=this.Qn(t,e),this.stream.Qt((()=>{r((()=>this.listener.Qt()))})),this.stream.zt((()=>{r((()=>(this.state=2,this.Sn=this.Tn.enqueueAfterDelay(this.wn,1e4,(()=>(this.Fn()&&(this.state=3),Promise.resolve()))),this.listener.zt())))})),this.stream.Ht((s=>{r((()=>this.Wn(s)))})),this.stream.onMessage((s=>{r((()=>++this.Dn==1?this.Gn(s):this.onNext(s)))}))}On(){this.state=5,this.xn.mn((async()=>{this.state=0,this.start()}))}Wn(t){return k(fu,`close with error: ${t}`),this.stream=null,this.close(4,t)}$n(t){return e=>{this.Tn.enqueueAndForget((()=>this.bn===t?e():(k(fu,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class _m extends $c{constructor(t,e,r,s,o,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,r,s,a),this.serializer=o}Qn(t,e){return this.connection.cn("Listen",t,e)}Gn(t){return this.onNext(t)}onNext(t){this.xn.reset();const e=Zd(this.serializer,t),r=(function(o){if(!("targetChange"in o))return q.min();const a=o.targetChange;return a.targetIds&&a.targetIds.length?q.min():a.readTime?te(a.readTime):q.min()})(t);return this.listener.zn(e,r)}jn(t){const e={};e.database=Di(this.serializer),e.addTarget=(function(o,a){let c;const h=a.target;if(c=$e(h)?{pipelineQuery:om(o,h)}:wc(h)?{documents:nm(o,h)}:{query:rm(o,h).yt},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=Cc(o,a.resumeToken);const f=bi(o,a.expectedCount);f!==null&&(c.expectedCount=f)}else if(a.snapshotVersion.compareTo(q.min())>0){c.readTime=gs(o,a.snapshotVersion.toTimestamp());const f=bi(o,a.expectedCount);f!==null&&(c.expectedCount=f)}return c})(this.serializer,t);const r=im(this.serializer,t);r&&(e.labels=r),this.Bn(e)}Hn(t){const e={};e.database=Di(this.serializer),e.removeTarget=t,this.Bn(e)}}class ym extends $c{constructor(t,e,r,s,o,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,r,s,a),this.serializer=o}get Jn(){return this.Dn>0}start(){this.lastStreamToken=void 0,super.start()}qn(){this.Jn&&this.Yn([])}Qn(t,e){return this.connection.cn("Write",t,e)}Gn(t){return M(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,M(!t.writeResults||t.writeResults.length===0,55816),this.listener.Zn()}onNext(t){M(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.xn.reset();const e=em(t.writeResults,t.commitTime),r=te(t.commitTime);return this.listener.Xn(r,e)}er(){const t={};t.database=Di(this.serializer),this.Bn(t)}Yn(t){const e={streamToken:this.lastStreamToken,writes:t.map((r=>tm(this.serializer,r)))};this.Bn(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Em{}class Tm extends Em{constructor(t,e,r,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=s,this.tr=!1}nr(){if(this.tr)throw new O(b.FAILED_PRECONDITION,"The client has already been terminated.")}Bt(t,e,r,s){return this.nr(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,a])=>this.connection.Bt(t,xi(e,r),s,o,a))).catch((o=>{throw o.name==="FirebaseError"?(o.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new O(b.UNKNOWN,o.toString())}))}$t(t,e,r,s,o){return this.nr(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,c])=>this.connection.$t(t,xi(e,r),s,a,c,o))).catch((a=>{throw a.name==="FirebaseError"?(a.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new O(b.UNKNOWN,a.toString())}))}terminate(){this.tr=!0,this.connection.terminate()}}function vm(n,t,e,r){return new Tm(n,t,e,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wm="ComponentProvider",du=new Map;function Im(n,t,e,r,s){return new hd(n,t,e,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,Fc(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mu={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},qc=41943040;class xt{static withCacheSize(t){return new xt(t,xt.DEFAULT_COLLECTION_PERCENTILE,xt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,r){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=r}}xt.DEFAULT_COLLECTION_PERCENTILE=10,xt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,xt.DEFAULT=new xt(qc,xt.DEFAULT_COLLECTION_PERCENTILE,xt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),xt.DISABLED=new xt(-1,0,0);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pu="LruGarbageCollector",Am=1048576;function gu([n,t],[e,r]){const s=H(n,e);return s===0?H(t,r):s}class Vm{constructor(t){this.rr=t,this.buffer=new ut(gu),this.ir=0}sr(){return++this.ir}_r(t){const e=[t,this.sr()];if(this.buffer.size<this.rr)this.buffer=this.buffer.add(e);else{const r=this.buffer.last();gu(e,r)<0&&(this.buffer=this.buffer.delete(r).add(e))}}get maxValue(){return this.buffer.last()[0]}}class Rm{constructor(t,e,r){this.garbageCollector=t,this.asyncQueue=e,this.localStore=r,this.ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.ur(6e4)}stop(){this.ar&&(this.ar.cancel(),this.ar=null)}get started(){return this.ar!==null}ur(t){k(pu,`Garbage collection scheduled in ${t}ms`),this.ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,(async()=>{this.ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){vn(e)?k(pu,"Ignoring IndexedDB error during garbage collection: ",e):await Tn(e)}await this.ur(3e5)}))}}class Pm{constructor(t,e){this.cr=t,this.params=e}calculateTargetCount(t,e){return this.cr.lr(t).next((r=>Math.floor(e/100*r)))}nthSequenceNumber(t,e){if(e===0)return S.resolve(Is.ce);const r=new Vm(e);return this.cr.forEachTarget(t,(s=>r._r(s.sequenceNumber))).next((()=>this.cr.Er(t,(s=>r._r(s))))).next((()=>r.maxValue))}removeTargets(t,e,r){return this.cr.removeTargets(t,e,r)}removeOrphanedDocuments(t,e){return this.cr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(k("LruGarbageCollector","Garbage collection skipped; disabled"),S.resolve(mu)):this.getCacheSize(t).next((r=>r<this.params.cacheSizeCollectionThreshold?(k("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),mu):this.hr(t,e)))}getCacheSize(t){return this.cr.getCacheSize(t)}hr(t,e){let r,s,o,a,c,h,f;const m=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next((p=>(p>this.params.maximumSequenceNumbersToCollect?(k("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,a=Date.now(),this.nthSequenceNumber(t,s)))).next((p=>(r=p,c=Date.now(),this.removeTargets(t,r,e)))).next((p=>(o=p,h=Date.now(),this.removeOrphanedDocuments(t,r)))).next((p=>(f=Date.now(),rn()<=W.DEBUG&&k("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-m}ms
	Determined least recently used ${s} in `+(c-a)+`ms
	Removed ${o} targets in `+(h-c)+`ms
	Removed ${p} documents in `+(f-h)+`ms
Total Duration: ${f-m}ms`),S.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:o,documentsRemoved:p}))))}}function Sm(n,t){return new Pm(n,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jc="firestore.googleapis.com",_u=!0;class yu{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new O(b.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=jc,this.ssl=_u}else this.host=t.host,this.ssl=t.ssl??_u;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=qc;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<Am)throw new O(b.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}Xf("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Fc(t.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new O(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new O(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new O(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Ds{constructor(t,e,r,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new yu({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new O(b.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new O(b.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new yu(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new qf;switch(r.type){case"firstParty":return new Hf(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new O(b.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(e){const r=du.get(e);r&&(k(wm,"Removing Datastore"),du.delete(e),r.terminate())})(this),Promise.resolve()}}function Cm(n,t,e,r={}){var f;n=ae(n,Ds);const s=Fu(t),o=n._getSettings(),a={...o,emulatorOptions:n._getEmulatorOptions()},c=`${t}:${e}`;s&&Mh(`https://${c}`),o.host!==jc&&o.host!==c&&Ht("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h={...o,host:c,ssl:s,emulatorOptions:r};if(!is(h,a)&&(n._setSettings(h),r.mockUserToken)){let m,p;if(typeof r.mockUserToken=="string")m=r.mockUserToken,p=At.MOCK_USER;else{m=Sh(r.mockUserToken,(f=n._app)==null?void 0:f.options.projectId);const V=r.mockUserToken.sub||r.mockUserToken.user_id;if(!V)throw new O(b.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new At(V)}n._authCredentials=new jf(new Yu(m,p))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rr{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new Rr(this.firestore,t,this._query)}}class at{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new we(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new at(this.firestore,t,this._key)}toJSON(){return{type:at._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,r){if(vr(e,at._jsonSchema))return new at(t,r||null,new U(Y.fromString(e.referencePath)))}}at._jsonSchemaVersion="firestore/documentReference/1.0",at._jsonSchema={type:ot("string",at._jsonSchemaVersion),referencePath:ot("string")};class we extends Rr{constructor(t,e,r){super(t,e,Xi(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new at(this.firestore,null,new U(t))}withConverter(t){return new we(this.firestore,t,this._path)}}function $_(n,t,...e){if(n=ln(n),Ju("collection","path",t),n instanceof Ds){const r=Y.fromString(t,...e);return za(r),new we(n,null,r)}{if(!(n instanceof at||n instanceof we))throw new O(b.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Y.fromString(t,...e));return za(r),new we(n.firestore,null,r)}}function q_(n,t,...e){if(n=ln(n),arguments.length===1&&(t=Gi.newId()),Ju("doc","path",t),n instanceof Ds){const r=Y.fromString(t,...e);return ja(r),new at(n,null,new U(r))}{if(!(n instanceof at||n instanceof we))throw new O(b.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Y.fromString(t,...e));return ja(r),new at(n.firestore,n instanceof we?n.converter:null,new U(r))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(t){this._values=(t||[]).map((e=>e))}toArray(){return this._values.map((t=>t))}isEqual(t){return(function(r,s){if(r.length!==s.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==s[o])return!1;return!0})(this._values,t._values)}toJSON(){return{type:Nt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(vr(t,Nt._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every((e=>typeof e=="number")))return new Nt(t.vectorValues);throw new O(b.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Nt._jsonSchemaVersion="firestore/vectorValue/1.0",Nt._jsonSchema={type:ot("string",Nt._jsonSchemaVersion),vectorValues:ot("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bm=/^__.*__$/;class xm{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return this.fieldMask!==null?new Ye(t,this.data,this.fieldMask,e,this.fieldTransforms):new Ir(t,this.data,e,this.fieldTransforms)}}function zc(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw F(40011,{dataSource:n})}}class so{constructor(t,e,r,s,o,a){this.settings=t,this.databaseId=e,this.serializer=r,this.ignoreUndefinedProperties=s,o===void 0&&this.validatePath(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(t){return new so({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(t){var s;const e=(s=this.path)==null?void 0:s.child(t),r=this.contextWith({path:e,arrayElement:!1});return r.validatePathSegment(t),r}childContextForFieldPath(t){var s;const e=(s=this.path)==null?void 0:s.child(t),r=this.contextWith({path:e,arrayElement:!1});return r.validatePath(),r}childContextForArray(t){return this.contextWith({path:void 0,arrayElement:!0})}createError(t){return ys(t,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(t){return this.fieldMask.find((e=>t.isPrefixOf(e)))!==void 0||this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))!==void 0}validatePath(){if(this.path)for(let t=0;t<this.path.length;t++)this.validatePathSegment(this.path.get(t))}validatePathSegment(t){if(t.length===0)throw this.createError("Document fields must not be empty");if(zc(this.dataSource)&&bm.test(t))throw this.createError('Document fields cannot begin and end with "__"')}}class Dm{constructor(t,e,r){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=r||xs(t)}createContext(t,e,r,s=!1){return new so({dataSource:t,methodName:e,targetDoc:r,path:ft.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Nm(n){const t=n._freezeSettings(),e=xs(n._databaseId);return new Dm(n._databaseId,!!t.ignoreUndefinedProperties,e)}function km(n,t,e,r,s,o={}){const a=n.createContext(o.merge||o.mergeFields?2:0,t,e,s);Qc("Data must be an object, but it was:",a,r);const c=Gc(r,a);let h,f;if(o.merge)h=new Gt(a.fieldMask),f=a.fieldTransforms;else if(o.mergeFields){const m=[];for(const p of o.mergeFields){const V=Ns(t,p,e);if(!a.contains(V))throw new O(b.INVALID_ARGUMENT,`Field '${V}' is specified in your field mask but missing from your input data.`);Mm(m,V)||m.push(V)}h=new Gt(m),f=a.fieldTransforms.filter((p=>h.covers(p.field)))}else h=null,f=a.fieldTransforms;return new xm(new Ft(c),h,f)}function mr(n,t,e){if(Hc(n=ln(n)))return Qc("Unsupported field value:",t,n),Gc(n,t);if(n instanceof Uc)return(function(s,o){if(!zc(o.dataSource))throw o.createError(`${s._methodName}() can only be used with update() and set()`);if(!o.path)throw o.createError(`${s._methodName}() is not currently supported inside arrays`);const a=s._toFieldTransform(o);a&&o.fieldTransforms.push(a)})(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.arrayElement&&t.dataSource!==4)throw t.createError("Nested arrays are not supported");return(function(s,o){const a=[];let c=0;for(const h of s){let f=mr(h,o.childContextForArray(c));f==null&&(f={nullValue:"NULL_VALUE"}),a.push(f),c++}return{arrayValue:{values:a}}})(n,t)}return(function(s,o,a){if((s=ln(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return Wi(o.serializer,s,a);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const c=tt.fromDate(s);return{timestampValue:gs(o.serializer,c)}}if(s instanceof tt){const c=new tt(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:gs(o.serializer,c)}}if(s instanceof ee)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof jt)return{bytesValue:Cc(o.serializer,s._byteString)};if(s instanceof at){const c=o.databaseId,h=s.firestore._databaseId;if(!h.isEqual(c))throw o.createError(`Document reference is for database ${h.projectId}/${h.database} but should be for database ${c.projectId}/${c.database}`);return{referenceValue:no(s.firestore._databaseId||o.databaseId,s._key.path)}}if(s instanceof Nt)return(function(h,f){const m=h instanceof Nt?h.toArray():h;return{mapValue:{fields:{[ic]:{stringValue:oc},[ur]:{arrayValue:{values:m.map((V=>{if(typeof V!="number")throw f.createError("VectorValues must only contain numeric values.");return Rs(f.serializer,V)}))}}}}}})(s,o);if(Lc(s))return s._toProto(o.serializer);throw o.createError(`Unsupported field value: ${Hi(s)}`)})(n,t,e)}function Gc(n,t){const e={};return Zu(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):We(n,((r,s)=>{const o=mr(s,t.childContextForField(r));o!=null&&(e[r]=o)})),{mapValue:{fields:e}}}function Hc(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof tt||n instanceof ee||n instanceof jt||n instanceof at||n instanceof Uc||n instanceof Nt||Lc(n))}function Qc(n,t,e){if(!Hc(e)||!Tr(e)){const r=Hi(e);throw r==="an object"?t.createError(n+" a custom object"):t.createError(n+" "+r)}}function Ns(n,t,e){if((t=ln(t))instanceof ro)return t._internalPath;if(typeof t=="string")return Lm(n,t);throw ys("Field path arguments must be of type string or ",n,!1,void 0,e)}const Om=new RegExp("[~\\*/\\[\\]]");function Lm(n,t,e){if(t.search(Om)>=0)throw ys(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new ro(...t.split("."))._internalPath}catch{throw ys(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function ys(n,t,e,r,s){const o=r&&!r.isEmpty(),a=s!==void 0;let c=`Function ${t}() called with invalid data`;e&&(c+=" (via `toFirestore()`)"),c+=". ";let h="";return(o||a)&&(h+=" (found",o&&(h+=` in field ${r}`),a&&(h+=` in document ${s}`),h+=")"),new O(b.INVALID_ARGUMENT,c+n+h)}function Mm(n,t){return n.some((e=>e.isEqual(t)))}function Kc(n){return typeof n._readUserData=="function"}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(t){this.optionDefinitions=t}_getKnownOptions(t,e){const r=Ft.empty();for(const s in this.optionDefinitions)if(this.optionDefinitions.hasOwnProperty(s)){const o=this.optionDefinitions[s];if(s in t){const a=t[s];let c;o.nestedOptions&&Tr(a)?c={mapValue:{fields:new Rt(o.nestedOptions).getOptionsProto(e,a)}}:a&&(c=mr(a,e)??void 0),c&&r.set(ft.fromServerFormat(o.serverName),c)}}return r}getOptionsProto(t,e,r){const s=this._getKnownOptions(e,t);if(r){const o=new Map(cd(r,((a,c)=>[ft.fromServerFormat(c),a!==void 0?mr(a,t):null])));s.setAll(o)}return s.value.mapValue.fields??{}}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Um(n){return typeof n=="object"&&n!==null&&!!("nullValue"in n&&(n.nullValue===null||n.nullValue==="NULL_VALUE")||"booleanValue"in n&&(n.booleanValue===null||typeof n.booleanValue=="boolean")||"integerValue"in n&&(n.integerValue===null||typeof n.integerValue=="number"||typeof n.integerValue=="string")||"doubleValue"in n&&(n.doubleValue===null||typeof n.doubleValue=="number")||"timestampValue"in n&&(n.timestampValue===null||(function(e){return typeof e=="object"&&e!==null&&"seconds"in e&&(e.seconds===null||typeof e.seconds=="number"||typeof e.seconds=="string")&&"nanos"in e&&(e.nanos===null||typeof e.nanos=="number")})(n.timestampValue))||"stringValue"in n&&(n.stringValue===null||typeof n.stringValue=="string")||"bytesValue"in n&&(n.bytesValue===null||n.bytesValue instanceof Uint8Array)||"referenceValue"in n&&(n.referenceValue===null||typeof n.referenceValue=="string")||"geoPointValue"in n&&(n.geoPointValue===null||(function(e){return typeof e=="object"&&e!==null&&"latitude"in e&&(e.latitude===null||typeof e.latitude=="number")&&"longitude"in e&&(e.longitude===null||typeof e.longitude=="number")})(n.geoPointValue))||"arrayValue"in n&&(n.arrayValue===null||(function(e){return typeof e=="object"&&e!==null&&!(!("values"in e)||e.values!==null&&!Array.isArray(e.values))})(n.arrayValue))||"mapValue"in n&&(n.mapValue===null||(function(e){return typeof e=="object"&&e!==null&&!(!("fields"in e)||e.fields!==null&&!Tr(e.fields))})(n.mapValue))||"fieldReferenceValue"in n&&(n.fieldReferenceValue===null||typeof n.fieldReferenceValue=="string")||"functionValue"in n&&(n.functionValue===null||(function(e){return typeof e=="object"&&e!==null&&!(!("name"in e)||e.name!==null&&typeof e.name!="string"||!("args"in e)||e.args!==null&&!Array.isArray(e.args))})(n.functionValue))||"pipelineValue"in n&&(n.pipelineValue===null||(function(e){return typeof e=="object"&&e!==null&&!(!("stages"in e)||e.stages!==null&&!Array.isArray(e.stages))})(n.pipelineValue)))}function Fm(n){return new Nt(n)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function D(n){let t;return n instanceof Xe?n:(t=Tr(n)?zm(n):n instanceof Array?Gm(n):Wc(n,void 0),t)}function _i(n){if(n instanceof Xe)return n;if(n instanceof Nt)return pr(n);if(Array.isArray(n))return pr(Fm(n));throw new Error("Unsupported value: "+typeof n)}function io(n){return od(n)?ns(n):D(n)}class Xe{constructor(){this._protoValueType="ProtoValue"}add(t){return new P("add",[this,D(t)],"add")}asBoolean(){if(this instanceof Ce)return this;if(this instanceof In)return new Jc(this);if(this instanceof wn)return new jm(this);if(this instanceof P)return new Yc(this);throw new O("invalid-argument",`Conversion of type ${typeof this} to BooleanExpression not supported.`)}subtract(t){return new P("subtract",[this,D(t)],"subtract")}multiply(t){return new P("multiply",[this,D(t)],"multiply")}divide(t){return new P("divide",[this,D(t)],"divide")}mod(t){return new P("mod",[this,D(t)],"mod")}equal(t){return new P("equal",[this,D(t)],"equal").asBoolean()}notEqual(t){return new P("not_equal",[this,D(t)],"notEqual").asBoolean()}lessThan(t){return new P("less_than",[this,D(t)],"lessThan").asBoolean()}lessThanOrEqual(t){return new P("less_than_or_equal",[this,D(t)],"lessThanOrEqual").asBoolean()}greaterThan(t){return new P("greater_than",[this,D(t)],"greaterThan").asBoolean()}greaterThanOrEqual(t){return new P("greater_than_or_equal",[this,D(t)],"greaterThanOrEqual").asBoolean()}arrayConcat(t,...e){const r=[t,...e].map((s=>D(s)));return new P("array_concat",[this,...r],"arrayConcat")}arrayContains(t){return new P("array_contains",[this,D(t)],"arrayContains").asBoolean()}arrayContainsAll(t){const e=Array.isArray(t)?new Qn(t.map(D),"arrayContainsAll"):t;return new P("array_contains_all",[this,e],"arrayContainsAll").asBoolean()}arrayContainsAny(t){const e=Array.isArray(t)?new Qn(t.map(D),"arrayContainsAny"):t;return new P("array_contains_any",[this,e],"arrayContainsAny").asBoolean()}arrayReverse(){return new P("array_reverse",[this])}arrayLength(){return new P("array_length",[this],"arrayLength")}equalAny(t){const e=Array.isArray(t)?new Qn(t.map(D),"equalAny"):t;return new P("equal_any",[this,e],"equalAny").asBoolean()}notEqualAny(t){const e=Array.isArray(t)?new Qn(t.map(D),"notEqualAny"):t;return new P("not_equal_any",[this,e],"notEqualAny").asBoolean()}exists(){return new P("exists",[this],"exists").asBoolean()}charLength(){return new P("char_length",[this],"charLength")}like(t){return new P("like",[this,D(t)],"like").asBoolean()}regexContains(t){return new P("regex_contains",[this,D(t)],"regexContains").asBoolean()}regexFind(t){return new P("regex_find",[this,D(t)],"regexFind")}regexFindAll(t){return new P("regex_find_all",[this,D(t)],"regexFindAll")}regexMatch(t){return new P("regex_match",[this,D(t)],"regexMatch").asBoolean()}stringContains(t){return new P("string_contains",[this,D(t)],"stringContains").asBoolean()}startsWith(t){return new P("starts_with",[this,D(t)],"startsWith").asBoolean()}endsWith(t){return new P("ends_with",[this,D(t)],"endsWith").asBoolean()}toLower(){return new P("to_lower",[this],"toLower")}toUpper(){return new P("to_upper",[this],"toUpper")}trim(t){const e=[this];return t&&e.push(D(t)),new P("trim",e,"trim")}ltrim(t){const e=[this];return t&&e.push(D(t)),new P("ltrim",e,"ltrim")}rtrim(t){const e=[this];return t&&e.push(D(t)),new P("rtrim",e,"rtrim")}type(){return new P("type",[this])}isType(t){return new P("is_type",[this,pr(t)],"isType").asBoolean()}stringConcat(t,...e){const r=[t,...e].map(D);return new P("string_concat",[this,...r],"stringConcat")}stringIndexOf(t){return new P("string_index_of",[this,D(t)],"stringIndexOf")}stringRepeat(t){return new P("string_repeat",[this,D(t)],"stringRepeat")}stringReplaceAll(t,e){return new P("string_replace_all",[this,D(t),D(e)],"stringReplaceAll")}stringReplaceOne(t,e){return new P("string_replace_one",[this,D(t),D(e)],"stringReplaceOne")}concat(t,...e){const r=[t,...e].map(D);return new P("concat",[this,...r],"concat")}reverse(){return new P("reverse",[this],"reverse")}arrayFilter(t,e){return new P("array_filter",[this,D(t),e],"arrayFilter")}arrayTransform(t,e){return new P("array_transform",[this,D(t),e],"arrayTransform")}arrayTransformWithIndex(t,e,r){return new P("array_transform",[this,D(t),D(e),r],"arrayTransformWithIndex")}arraySlice(t,e){const r=[this,D(t)];return e!==void 0&&r.push(D(e)),new P("array_slice",r,"arraySlice")}arrayFirst(){return new P("array_first",[this],"arrayFirst")}arrayFirstN(t){return new P("array_first_n",[this,D(t)],"arrayFirstN")}arrayLast(){return new P("array_last",[this],"arrayLast")}arrayLastN(t){return new P("array_last_n",[this,D(t)],"arrayLastN")}arrayMaximum(){return new P("maximum",[this],"arrayMaximum")}arrayMaximumN(t){return new P("maximum_n",[this,D(t)],"arrayMaximumN")}arrayMinimum(){return new P("minimum",[this],"arrayMinimum")}arrayMinimumN(t){return new P("minimum_n",[this,D(t)],"arrayMinimumN")}arrayIndexOf(t){return new P("array_index_of",[this,D(t),D("first")],"arrayIndexOf")}arrayLastIndexOf(t){return new P("array_index_of",[this,D(t),D("last")],"arrayLastIndexOf")}arrayIndexOfAll(t){return new P("array_index_of_all",[this,D(t)],"arrayIndexOfAll")}byteLength(){return new P("byte_length",[this],"byteLength")}ceil(){return new P("ceil",[this])}floor(){return new P("floor",[this])}abs(){return new P("abs",[this])}exp(){return new P("exp",[this])}mapGet(t){return new P("map_get",[this,pr(t)],"mapGet")}mapSet(t,e,...r){const s=[this,D(t),D(e),...r.map(D)];return new P("map_set",s,"mapSet")}mapKeys(){return new P("map_keys",[this],"mapKeys")}mapValues(){return new P("map_values",[this],"mapValues")}mapEntries(){return new P("map_entries",[this],"mapEntries")}getField(t){return new P("get_field",[this,D(t)],"get_field")}count(){return Ut._create("count",[this],"count")}sum(){return Ut._create("sum",[this],"sum")}average(){return Ut._create("average",[this],"average")}minimum(){return Ut._create("minimum",[this],"minimum")}maximum(){return Ut._create("maximum",[this],"maximum")}first(){return Ut._create("first",[this],"first")}last(){return Ut._create("last",[this],"last")}arrayAgg(){return Ut._create("array_agg",[this],"arrayAgg")}arrayAggDistinct(){return Ut._create("array_agg_distinct",[this],"arrayAggDistinct")}countDistinct(){return Ut._create("count_distinct",[this],"countDistinct")}logicalMaximum(t,...e){const r=[t,...e];return new P("maximum",[this,...r.map(D)],"logicalMaximum")}logicalMinimum(t,...e){const r=[t,...e];return new P("minimum",[this,...r.map(D)],"minimum")}vectorLength(){return new P("vector_length",[this],"vectorLength")}cosineDistance(t){return new P("cosine_distance",[this,_i(t)],"cosineDistance")}dotProduct(t){return new P("dot_product",[this,_i(t)],"dotProduct")}euclideanDistance(t){return new P("euclidean_distance",[this,_i(t)],"euclideanDistance")}unixMicrosToTimestamp(){return new P("unix_micros_to_timestamp",[this],"unixMicrosToTimestamp")}timestampToUnixMicros(){return new P("timestamp_to_unix_micros",[this],"timestampToUnixMicros")}unixMillisToTimestamp(){return new P("unix_millis_to_timestamp",[this],"unixMillisToTimestamp")}timestampToUnixMillis(){return new P("timestamp_to_unix_millis",[this],"timestampToUnixMillis")}unixSecondsToTimestamp(){return new P("unix_seconds_to_timestamp",[this],"unixSecondsToTimestamp")}timestampToUnixSeconds(){return new P("timestamp_to_unix_seconds",[this],"timestampToUnixSeconds")}timestampAdd(t,e){return new P("timestamp_add",[this,D(t),D(e)],"timestampAdd")}timestampSubtract(t,e){return new P("timestamp_subtract",[this,D(t),D(e)],"timestampSubtract")}timestampDiff(t,e){return new P("timestamp_diff",[this,io(t),D(e)],"timestampDiff")}timestampExtract(t,e){const r=[this,D(t)];return e&&r.push(D(e)),new P("timestamp_extract",r,"timestampExtract")}documentId(){return new P("document_id",[this],"documentId")}parent(){return new P("parent",[this],"parent")}substring(t,e){const r=D(t);return new P("substring",e===void 0?[this,r]:[this,r,D(e)],"substring")}arrayGet(t){return new P("array_get",[this,D(t)],"arrayGet")}isError(){return new P("is_error",[this],"isError").asBoolean()}ifError(t){const e=new P("if_error",[this,D(t)],"ifError");return t instanceof Ce?e.asBoolean():e}isAbsent(){return new P("is_absent",[this],"isAbsent").asBoolean()}mapRemove(t){return new P("map_remove",[this,D(t)],"mapRemove")}mapMerge(t,...e){const r=D(t),s=e.map(D);return new P("map_merge",[this,r,...s],"mapMerge")}pow(t){return new P("pow",[this,D(t)])}trunc(t){return t===void 0?new P("trunc",[this]):new P("trunc",[this,D(t)],"trunc")}round(t){return t===void 0?new P("round",[this]):new P("round",[this,D(t)],"round")}collectionId(){return new P("collection_id",[this])}length(){return new P("length",[this])}ln(){return new P("ln",[this])}sqrt(){return new P("sqrt",[this])}stringReverse(){return new P("string_reverse",[this])}ifAbsent(t){return new P("if_absent",[this,D(t)],"ifAbsent")}ifNull(t){return new P("if_null",[this,D(t)],"ifNull")}coalesce(t,...e){return new P("coalesce",[this,D(t),...e.map(D)],"coalesce")}join(t){return new P("join",[this,D(t)],"join")}log10(){return new P("log10",[this])}arraySum(){return new P("sum",[this])}split(t){return new P("split",[this,D(t)])}timestampTruncate(t,e){const r=[this,D(t)];return e&&r.push(D(e)),new P("timestamp_trunc",r)}ascending(){return Hm(this)}descending(){return Qm(this)}as(t){return new $m(this,t,"as")}}class Ut{constructor(t,e){this.name=t,this.params=e,this.exprType="AggregateFunction",this._protoValueType="ProtoValue"}static _create(t,e,r){const s=new Ut(t,e);return s._methodName=r,s}as(t){return new Bm(this,t,"as")}_toProto(t){return{functionValue:{name:this.name,args:this.params.map((e=>e._toProto(t)))}}}_readUserData(t){t=this._methodName?t.contextWith({methodName:this._methodName}):t,this.params.forEach((e=>e._readUserData(t)))}}class Bm{constructor(t,e,r){this.aggregate=t,this.alias=e,this._methodName=r}_readUserData(t){this.aggregate._readUserData(t)}}class $m{constructor(t,e,r){this.expr=t,this.alias=e,this._methodName=r,this.exprType="AliasedExpression",this.selectable=!0}_readUserData(t){this.expr._readUserData(t)}}class Qn extends Xe{constructor(t,e){super(),this.Rr=t,this._methodName=e,this.expressionType="ListOfExpressions"}_toProto(t){return{arrayValue:{values:this.Rr.map((e=>e._toProto(t)))}}}_readUserData(t){this.Rr.forEach((e=>e._readUserData(t)))}}class wn extends Xe{constructor(t,e){super(),this.fieldPath=t,this._methodName=e,this.expressionType="Field",this.selectable=!0}get _fieldPath(){return this.fieldPath}get fieldName(){return this.fieldPath.canonicalString()}get alias(){return this.fieldName}get expr(){return this}geoDistance(t){return new P("geo_distance",[this,D(t)],"geoDistance")}_toProto(t){return{fieldReferenceValue:this.fieldPath.canonicalString()}}_readUserData(t){}}function ns(n){return qm(n,"field")}function qm(n,t){return new wn(typeof n=="string"?Yt===n?hm()._internalPath:Ns("field",n):n._internalPath,t)}class In extends Xe{constructor(t,e){super(),this.value=t,this._methodName=e,this.expressionType="Constant"}static _fromProto(t){const e=new In(t,void 0);return e._protoValue=t,e}_toProto(t){return M(this._protoValue!==void 0,237),this._protoValue}_getValue(){return this._protoValue}_readUserData(t){t=this._methodName?t.contextWith({methodName:this._methodName}):t,Um(this._protoValue)||(this._protoValue=mr(this.value,t))}}function pr(n,t){return Wc(n,"constant")}function Wc(n,t){const e=new In(n,t);return typeof n=="boolean"?new Jc(e):e}class P extends Xe{constructor(t,e,r,s){super(),this.name=t,this.params=e,this.expressionType="Function",this._optionsProto=void 0,r!==void 0&&(this._methodName=r),s!==void 0&&(this._options=s)}get _optionsUtil(){return new Rt({})}_toProto(t){const e={functionValue:{name:this.name,args:this.params.map((r=>r._toProto(t)))}};return this._optionsProto&&(e.functionValue.options=this._optionsProto),e}_readUserData(t){t=this._methodName?t.contextWith({methodName:this._methodName}):t,this.params.forEach((e=>e._readUserData(t))),this._options&&(this._optionsProto=this._optionsUtil.getOptionsProto(t,this._options))}}class Ce extends Xe{get _methodName(){return this._expr._methodName}countIf(){return Ut._create("count_if",[this],"countIf")}not(){return new P("not",[this],"not").asBoolean()}conditional(t,e){return new P("conditional",[this,t,e],"conditional")}ifError(t){const e=D(t),r=new P("if_error",[this,e],"ifError");return e instanceof Ce?r.asBoolean():r}_toProto(t){return this._expr._toProto(t)}_readUserData(t){this._expr._readUserData(t)}}class Yc extends Ce{constructor(t){super(),this._expr=t,this.expressionType="Function"}}class Jc extends Ce{constructor(t){super(),this._expr=t,this.expressionType="Constant"}_getValue(){return this._expr._getValue()}}class jm extends Ce{constructor(t){super(),this._expr=t,this.expressionType="Field"}}function zm(n,t){const e=[];for(const r in n)if(Object.prototype.hasOwnProperty.call(n,r)){const s=n[r];e.push(pr(r)),e.push(D(s))}return new P("map",e,"map")}function Gm(n){return(function(e,r){return new P("array",e.map((s=>D(s))),r)})(n,"array")}function Hm(n){return new Xc(io(n),"ascending","ascending")}function Qm(n){return new Xc(io(n),"descending","descending")}class Xc{constructor(t,e,r){this.expr=t,this.direction=e,this._methodName=r,this._protoValueType="ProtoValue"}_toProto(t){return{mapValue:{fields:{direction:Mc(this.direction),expression:this.expr._toProto(t)}}}}_readUserData(t){this.expr._readUserData(t)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t{constructor(t){this.optionsProto=void 0,{rawOptions:this.rawOptions,...this.knownOptions}=t}_readUserData(t){this.optionsProto=this._optionsUtil.getOptionsProto(t,this.knownOptions,this.rawOptions)}_toProto(t){return{name:this._name,options:this.optionsProto}}}class Zc extends $t{get _name(){return"add_fields"}get _optionsUtil(){return new Rt({})}constructor(t,e){super(e),this.fields=t}_toProto(t){return{...super._toProto(t),args:[dr(t,this.fields)]}}_readUserData(t){super._readUserData(t),be(this.fields,t)}}class tl extends $t{get _name(){return"aggregate"}get _optionsUtil(){return new Rt({})}constructor(t,e,r){super(r),this.groups=t,this.accumulators=e}_toProto(t){return{...super._toProto(t),args:[dr(t,this.accumulators),dr(t,this.groups)]}}_readUserData(t){super._readUserData(t),be(this.groups,t),be(this.accumulators,t)}}class el extends $t{get _name(){return"distinct"}get _optionsUtil(){return new Rt({})}constructor(t,e){super(e),this.groups=t}_toProto(t){return{...super._toProto(t),args:[dr(t,this.groups)]}}_readUserData(t){super._readUserData(t),be(this.groups,t)}}class ks extends $t{get _name(){return"collection"}get _optionsUtil(){return new Rt({forceIndex:{serverName:"force_index"}})}constructor(t,e){super(e),this.Vr=t.startsWith("/")?t:"/"+t}_toProto(t){return{...super._toProto(t),args:[{referenceValue:this.Vr}]}}_readUserData(t){super._readUserData(t)}}class Os extends $t{get _name(){return"collection_group"}get _optionsUtil(){return new Rt({forceIndex:{serverName:"force_index"}})}constructor(t,e){super(e),this.collectionId=t}_toProto(t){return{...super._toProto(t),args:[{referenceValue:""},{stringValue:this.collectionId}]}}_readUserData(t){super._readUserData(t)}}class oo extends $t{get _name(){return"database"}get _optionsUtil(){return new Rt({})}_toProto(t){return{...super._toProto(t)}}_readUserData(t){super._readUserData(t)}}class ao extends $t{get _name(){return"documents"}get _optionsUtil(){return new Rt({})}constructor(t,e){if(super(e),!t||t.length===0)throw new O(b.INVALID_ARGUMENT,"Empty document paths are not allowed in DocumentsSource");const r=t.map((o=>o.startsWith("/")?o:"/"+o)),s=new Set(r);if(s.size!==r.length)throw new O(b.INVALID_ARGUMENT,"Duplicate document paths are not allowed in DocumentsSource");this.dr=r,this.mr=s}_toProto(t){return{...super._toProto(t),args:this.dr.map((e=>({referenceValue:e})))}}_readUserData(t){super._readUserData(t)}}class Ls extends $t{get _name(){return"where"}get _optionsUtil(){return new Rt({})}constructor(t,e){super(e),this.condition=t}_toProto(t){return{...super._toProto(t),args:[this.condition._toProto(t)]}}_readUserData(t){super._readUserData(t),be(this.condition,t)}}class Ke extends $t{get _name(){return"limit"}get _optionsUtil(){return new Rt({})}constructor(t,e){M(!isNaN(t)&&t!==1/0&&t!==-1/0,34860),super(e),this.limit=t}_toProto(t){return{...super._toProto(t),args:[Wi(t,this.limit)]}}}class Eu extends $t{get _name(){return"offset"}get _optionsUtil(){return new Rt({})}constructor(t,e){super(e),this.offset=t}_toProto(t){return{...super._toProto(t),args:[Wi(t,this.offset)]}}}class Km extends $t{get _name(){return"select"}get _optionsUtil(){return new Rt({})}constructor(t,e){super(e),this.selections=t}_toProto(t){return{...super._toProto(t),args:[dr(t,this.selections)]}}_readUserData(t){super._readUserData(t),be(this.selections,t)}}class ie extends $t{get _name(){return"sort"}get _optionsUtil(){return new Rt({})}constructor(t,e){super(e),this.orderings=t}_toProto(t){return{...super._toProto(t),args:this.orderings.map((e=>e._toProto(t)))}}_readUserData(t){super._readUserData(t),be(this.orderings,t)}}class uo extends $t{get _name(){return"replace_with"}get _optionsUtil(){return new Rt({})}constructor(t,e){super(e),this.map=t}_toProto(t){return{...super._toProto(t),args:[this.map._toProto(t),Mc(uo.pr)]}}_readUserData(t){super._readUserData(t),be(this.map,t)}}uo.pr="full_replace";function be(n,t){return Kc(n)?n._readUserData(t):Array.isArray(n)?n.forEach((e=>e._readUserData(t))):n instanceof Map?n.forEach((e=>e._readUserData(t))):Object.values(n).forEach((e=>e._readUserData(t))),n}// Copyright 2024 Google LLC* @license
class Ct{constructor(t,e,r){this.serializer=t,this.stages=e,this.listenOptions=r,this.isCorePipeline=!0}getPipelineCollection(){return Ms(this)}getPipelineCollectionGroup(){return co(this)}getPipelineCollectionId(){return Wm(this)}getPipelineDocuments(){return ki(this)}getPipelineFlavor(){return(function(e){let r="exact";return e.stages.forEach(((s,o)=>{s._name!==el.name&&s._name!==tl.name||(r="keyless"),s._name===Km.name&&r==="exact"&&(r="augmented"),s._name===Zc.name&&o<e.stages.length-1&&r==="exact"&&(r="augmented")})),r})(this)}getPipelineSourceType(){return Ie(this)}}function Ie(n){const t=n.stages[0];return t instanceof ks||t instanceof Os||t instanceof oo||t instanceof ao?t._name:"unknown"}function Ms(n){if(Ie(n)==="collection")return n.stages[0].Vr}function co(n){if(Ie(n)==="collection_group")return n.stages[0].collectionId}function Wm(n){switch(Ie(n)){case"collection":return Y.fromString(Ms(n)).lastSegment();case"collection_group":return co(n);default:return}}function ki(n){if(Ie(n)==="documents")return n.stages[0].dr}class tr{constructor(t,e,r,s){this._db=t,this.userDataReader=e,this._userDataWriter=r,this.stages=s}wr(t,e){const r=this.userDataReader.createContext(3,t);return Kc(e)?e._readUserData(r):Array.isArray(e)?e.forEach((s=>s._readUserData(r))):e.forEach((s=>s._readUserData(r))),e}where(t){const e=this.stages.map((r=>r));return this.wr("where",t),e.push(new Ls(t,{})),new tr(this._db,this.userDataReader,this._userDataWriter,e)}limit(t){const e=this.stages.map((r=>r));return e.push(new Ke(t,{})),new tr(this._db,this.userDataReader,this._userDataWriter,e)}sort(t,...e){const r=this.stages.map((s=>s));return"orderings"in t?r.push(new ie(this.wr("sort",t.orderings),{})):r.push(new ie(this.wr("sort",[t,...e]),{})),new tr(this._db,this.userDataReader,this._userDataWriter,r)}br(t){return{pipeline:{stages:this.stages.map((e=>e._toProto(t)))}}}}// Copyright 2024 Google LLC* @license
class E{constructor(t,e){this.type=t,this.value=e}static vr(){return new E("ERROR",void 0)}static Sr(){return new E("UNSET",void 0)}static Dr(){return new E("NULL",dn)}static newValue(t){return Bt(t)?new E("NULL",dn):(function(r){return!!r&&"booleanValue"in r})(t)?new E("BOOLEAN",t):Jt(t)?new E("INT",t):qe(t)?new E("DOUBLE",t):(function(r){return!!r&&"timestampValue"in r&&!!r.timestampValue})(t)?new E("TIMESTAMP",t):(function(r){return!!r&&"stringValue"in r})(t)?new E("STRING",t):(function(r){return!!r&&"bytesValue"in r})(t)?new E("BYTES",t):t.referenceValue?new E("REFERENCE",t):t.geoPointValue?new E("GEO_POINT",t):pn(t)?new E("ARRAY",t):cs(t)?new E("VECTOR",t):je(t)?new E("MAP",t):new E("ERROR",void 0)}Cr(){return this.type==="ERROR"||this.type==="UNSET"}Fr(){return this.type==="NULL"}}function er(n){if(!n.Cr())return n.value}function nl(n){return n instanceof Ce?n._expr:n}function $(n){if((n=nl(n))instanceof wn)return new Ym(n);if(n instanceof In)return new Jm(n);if(n instanceof Qn)return new Xm(n);if(n instanceof P){if(n.name==="add")return new ep(n);if(n.name==="subtract")return new np(n);if(n.name==="multiply")return new rp(n);if(n.name==="divide")return new sp(n);if(n.name==="mod")return new ip(n);if(n.name==="and")return new op(n);if(n.name==="equal")return new yp(n);if(n.name==="not_equal")return new Ep(n);if(n.name==="less_than")return new Tp(n);if(n.name==="less_than_or_equal")return new vp(n);if(n.name==="greater_than")return new wp(n);if(n.name==="greater_than_or_equal")return new Ip(n);if(n.name==="array_concat")return new Ap(n);if(n.name==="array_reverse")return new Vp(n);if(n.name==="array_contains")return new Rp(n);if(n.name==="array_contains_all")return new Pp(n);if(n.name==="array_contains_any")return new Sp(n);if(n.name==="array_length")return new Cp(n);if(n.name==="array_element")return new bp(n);if(n.name==="equal_any")return new rl(n);if(n.name==="not_equal_any")return new up(n);if(n.name==="is_nan")return new cp(n);if(n.name==="is_not_nan")return new lp(n);if(n.name==="is_null")return new hp(n);if(n.name==="is_not_null")return new fp(n);if(n.name==="is_error")return new dp(n);if(n.name==="exists")return new mp(n);if(n.name==="not")return new Us(n);if(n.name==="or")return new ap(n);if(n.name==="xor")return new lo(n);if(n.name==="conditional")return new pp(n);if(n.name==="maximum")return new gp(n);if(n.name==="minimum")return new _p(n);if(n.name==="reverse")return new xp(n);if(n.name==="replace_first")return new Dp(n);if(n.name==="replace_all")return new Np(n);if(n.name==="char_length")return new kp(n);if(n.name==="byte_length")return new Op(n);if(n.name==="like")return new Lp(n);if(n.name==="regex_contains")return new Mp(n);if(n.name==="regex_match")return new Up(n);if(n.name==="string_contains")return new Fp(n);if(n.name==="starts_with")return new Bp(n);if(n.name==="ends_with")return new $p(n);if(n.name==="to_lower")return new qp(n);if(n.name==="to_upper")return new jp(n);if(n.name==="trim")return new zp(n);if(n.name==="string_concat")return new Gp(n);if(n.name==="map_get")return new Hp(n);if(n.name==="cosine_distance")return new Qp(n);if(n.name==="dot_product")return new Kp(n);if(n.name==="euclidean_distance")return new Wp(n);if(n.name==="vector_length")return new Yp(n);if(n.name==="unix_micros_to_timestamp")return new eg(n);if(n.name==="timestamp_to_unix_micros")return new sg(n);if(n.name==="unix_millis_to_timestamp")return new ng(n);if(n.name==="timestamp_to_unix_millis")return new ig(n);if(n.name==="unix_seconds_to_timestamp")return new rg(n);if(n.name==="timestamp_to_unix_seconds")return new og(n);if(n.name==="timestamp_add")return new ag(n);if(n.name==="timestamp_subtract")return new ug(n)}throw new Error(`Unknown Expr : ${n}`)}class Ym{constructor(t){this.expr=t}evaluate(t,e){if(this.expr.fieldName===Yt)return E.newValue({referenceValue:_s(t.serializer,e.key)});if(this.expr.fieldName==="__update_time__")return E.newValue({timestampValue:es(t.serializer,e.version)});if(this.expr.fieldName==="__create_time__")return E.newValue({timestampValue:es(t.serializer,e.createTime)});const r=e.data.field(this.expr._fieldPath);return r?Vs(r)?E.newValue((function(o,a){if(o.serverTimestampBehavior==="estimate")return{timestampValue:es(o.serializer,q.fromTimestamp(fn(a)))};if(o.serverTimestampBehavior==="previous"){const c=wr(a);if(c)return c}return{nullValue:"NULL_VALUE"}})(t,r)):E.newValue(r):E.Sr()}}class Jm{constructor(t){this.expr=t}evaluate(t,e){return E.newValue(this.expr._getValue())}}class Xm{constructor(t){this.expr=t}evaluate(t,e){const r=this.expr.Rr.map((s=>$(s).evaluate(t,e)));return r.some((s=>s.Cr()))?E.vr():E.newValue({arrayValue:{values:r.map((s=>s.value))}})}}function Et(n){return qe(n)?Number(n.doubleValue):Number(n.integerValue)}function re(n){return BigInt(n.integerValue)}const Zm=BigInt("0x7fffffffffffffff"),tp=-BigInt("0x8000000000000000");class Pr{constructor(t){this.expr=t}evaluate(t,e){M(this.expr.params.length>=2,24778);const r=$(this.expr.params[0]).evaluate(t,e),s=$(this.expr.params[1]).evaluate(t,e);let o=this.Or(r,s);for(const a of this.expr.params.slice(2)){const c=$(a).evaluate(t,e);o=this.Or(o,c)}return o}Or(t,e){if(t.Cr()||e.Cr())return E.vr();if(t.Fr()||e.Fr())return E.Dr();const r=t.value,s=e.value;if(!qe(r)&&!Jt(r)||!qe(s)&&!Jt(s))return E.vr();if(qe(r)||qe(s)){const o=this.Mr(r,s);return o?E.newValue(o):E.vr()}if(Jt(r)&&Jt(s)){const o=this.Nr(r,s);return o===void 0?E.vr():typeof o=="number"?E.newValue({doubleValue:o}):o<tp||o>Zm?E.vr():E.newValue({integerValue:`${o}`})}return E.vr()}}function he(n,t){return lt(n)!==lt(t)?"TYPE_MISMATCH":Lt(n)||Lt(t)?"NOT_EQ":Bt(n)&&Bt(t)?"EQ":Bt(n)||Bt(t)?"NULL":pn(n)&&pn(t)?(function(r,s){var a,c,h;if(((a=r.values)==null?void 0:a.length)!==((c=s.values)==null?void 0:c.length))return"NOT_EQ";let o=!1;for(let f=0;f<(((h=r.values)==null?void 0:h.length)??0);f++){const m=r.values[f],p=s.values[f];switch(he(m,p)){case"EQ":break;case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":o=!0;break;default:F(44609,{Lr:m,Br:p})}}return o?"NULL":"EQ"})(n.arrayValue,t.arrayValue):cs(n)&&cs(t)||je(n)&&je(t)?(function(r,s){const o=r.fields||{},a=s.fields||{};if(as(o)!==as(a))return"NOT_EQ";let c=!1;for(const h in o)if(o.hasOwnProperty(h)){if(a[h]===void 0)return"NOT_EQ";switch(he(o[h],a[h])){case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":c=!0}}return c?"NULL":"EQ"})(n.mapValue,t.mapValue):(function(r,s){return zt(r,s,{Te:!1,Ee:!0,he:!0})})(n,t)?"EQ":"NOT_EQ"}class ep extends Pr{Nr(t,e){return re(t)+re(e)}Mr(t,e){return{doubleValue:Et(t)+Et(e)}}}class np extends Pr{constructor(t){super(t),this.expr=t}Nr(t,e){return re(t)-re(e)}Mr(t,e){return{doubleValue:Et(t)-Et(e)}}}class rp extends Pr{constructor(t){super(t),this.expr=t}Nr(t,e){return re(t)*re(e)}Mr(t,e){return{doubleValue:Et(t)*Et(e)}}}class sp extends Pr{constructor(t){super(t),this.expr=t}Nr(t,e){const r=re(e);if(r!==BigInt(0))return re(t)/r}Mr(t,e){const r=Et(e);return r===0?{doubleValue:or(r)?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY}:{doubleValue:Et(t)/r}}}class ip extends Pr{constructor(t){super(t),this.expr=t}Nr(t,e){const r=re(e);if(r!==BigInt(0))return re(t)%r}Mr(t,e){const r=Et(e);if(r!==0)return{doubleValue:Et(t)%r}}}class op{constructor(t){this.expr=t}evaluate(t,e){var o;let r=!1,s=!1;for(const a of this.expr.params){const c=$(a).evaluate(t,e);switch(c.type){case"BOOLEAN":if(!((o=c.value)!=null&&o.booleanValue))return E.newValue(_t);break;case"NULL":s=!0;break;default:r=!0}}return r?E.vr():s?E.Dr():E.newValue(kt)}}class Us{constructor(t){this.expr=t}evaluate(t,e){var s;M(this.expr.params.length===1,9634);const r=$(this.expr.params[0]).evaluate(t,e);switch(r.type){case"BOOLEAN":return E.newValue({booleanValue:!((s=r.value)!=null&&s.booleanValue)});case"NULL":return E.Dr();default:return E.vr()}}}class ap{constructor(t){this.expr=t}evaluate(t,e){var o;let r=!1,s=!1;for(const a of this.expr.params){const c=$(a).evaluate(t,e);switch(c.type){case"BOOLEAN":if((o=c.value)!=null&&o.booleanValue)return E.newValue(kt);break;case"NULL":s=!0;break;default:r=!0}}return r?E.vr():s?E.Dr():E.newValue(_t)}}class lo{constructor(t){this.expr=t}evaluate(t,e){var o;let r=!1,s=!1;for(const a of this.expr.params){const c=$(a).evaluate(t,e);switch(c.type){case"BOOLEAN":r=lo.xor(r,!!((o=c.value)!=null&&o.booleanValue));break;case"NULL":s=!0;break;default:return E.vr()}}return s?E.Dr():E.newValue({booleanValue:r})}static xor(t,e){return(t||e)&&!(t&&e)}}class rl{constructor(t){this.expr=t}evaluate(t,e){var a,c;M(this.expr.params.length===2,55094);let r=!1;const s=$(this.expr.params[0]).evaluate(t,e);switch(s.type){case"NULL":r=!0;break;case"ERROR":case"UNSET":return E.vr()}const o=$(this.expr.params[1]).evaluate(t,e);switch(o.type){case"ARRAY":break;case"NULL":r=!0;break;default:return E.vr()}if(r)return E.Dr();for(const h of((c=(a=o.value)==null?void 0:a.arrayValue)==null?void 0:c.values)??[])switch(Bt(s.value)&&Bt(h)?"EQ":he(s.value,h)){case"EQ":return E.newValue(kt);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:F(44608,{value:s.value,candidate:h})}return r?E.Dr():E.newValue(_t)}}class up{constructor(t){this.expr=t}evaluate(t,e){return new Us(new P("not",[new P("equal_any",this.expr.params)])).evaluate(t,e)}}class cp{constructor(t){this.expr=t}evaluate(t,e){M(this.expr.params.length===1,23322);const r=$(this.expr.params[0]).evaluate(t,e);switch(r.type){case"INT":return E.newValue(_t);case"DOUBLE":return E.newValue({booleanValue:isNaN(Et(r.value))});case"NULL":return E.Dr();default:return E.vr()}}}class lp{constructor(t){this.expr=t}evaluate(t,e){return M(this.expr.params.length===1,50406),new Us(new P("not",[new P("is_nan",this.expr.params)])).evaluate(t,e)}}class hp{constructor(t){this.expr=t}evaluate(t,e){switch(M(this.expr.params.length===1,23123),$(this.expr.params[0]).evaluate(t,e).type){case"NULL":return E.newValue(kt);case"UNSET":case"ERROR":return E.vr();default:return E.newValue(_t)}}}class fp{constructor(t){this.expr=t}evaluate(t,e){return M(this.expr.params.length===1,23167),new Us(new P("not",[new P("is_null",this.expr.params)])).evaluate(t,e)}}class dp{constructor(t){this.expr=t}evaluate(t,e){return M(this.expr.params.length===1,5228),$(this.expr.params[0]).evaluate(t,e).type==="ERROR"?E.newValue(kt):E.newValue(_t)}}class mp{constructor(t){this.expr=t}evaluate(t,e){switch(M(this.expr.params.length===1,6877),$(this.expr.params[0]).evaluate(t,e).type){case"ERROR":return E.vr();case"UNSET":return E.newValue(_t);default:return E.newValue(kt)}}}class pp{constructor(t){this.expr=t}evaluate(t,e){var s;M(this.expr.params.length===3,11706);const r=$(this.expr.params[0]).evaluate(t,e);switch(r.type){case"BOOLEAN":return(s=r.value)!=null&&s.booleanValue?$(this.expr.params[1]).evaluate(t,e):$(this.expr.params[2]).evaluate(t,e);case"NULL":return $(this.expr.params[2]).evaluate(t,e);default:return E.vr()}}}class gp{constructor(t){this.expr=t}evaluate(t,e){const r=this.expr.params.map((o=>$(o).evaluate(t,e)));let s;for(const o of r)switch(o.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||Ot(o.value,s.value)>0?o:s}return s===void 0?E.Dr():s}}class _p{constructor(t){this.expr=t}evaluate(t,e){const r=this.expr.params.map((o=>$(o).evaluate(t,e)));let s;for(const o of r)switch(o.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||Ot(o.value,s.value)<0?o:s}return s===void 0?E.Dr():s}}class An{constructor(t){this.expr=t}evaluate(t,e){M(this.expr.params.length===2,31033,`${this.expr.name}() function should have exactly 2 params`);const r=$(this.expr.params[0]).evaluate(t,e);switch(r.type){case"ERROR":case"UNSET":return E.vr()}const s=$(this.expr.params[1]).evaluate(t,e);switch(s.type){case"ERROR":case"UNSET":return E.vr()}return this.Ur(r,s)}}class yp extends An{constructor(t){super(t),this.expr=t}Ur(t,e){if(t.Fr()&&e.Fr())return E.newValue(kt);if(t.Fr()||e.Fr()||Lt(t.value)||Lt(e.value)||lt(t.value)!==lt(e.value))return E.newValue(_t);switch(he(t.value,e.value)){case"EQ":return E.newValue(kt);case"NOT_EQ":return E.newValue(_t);case"NULL":return E.Dr();default:F(44615,{left:t,right:e})}}}class Ep extends An{constructor(t){super(t),this.expr=t}Ur(t,e){switch(he(t.value,e.value)){case"EQ":return E.newValue(_t);case"NOT_EQ":case"TYPE_MISMATCH":return E.newValue(kt);case"NULL":return E.Dr();default:F(44614,{left:t,right:e})}}}class Tp extends An{constructor(t){super(t),this.expr=t}Ur(t,e){return lt(t.value)!==lt(e.value)||Lt(t.value)||Lt(e.value)?E.newValue(_t):E.newValue({booleanValue:Ot(t.value,e.value)<0})}}class vp extends An{constructor(t){super(t),this.expr=t}Ur(t,e){return lt(t.value)!==lt(e.value)||Lt(t.value)||Lt(e.value)?E.newValue(_t):he(t.value,e.value)==="EQ"?E.newValue(kt):E.newValue({booleanValue:Ot(t.value,e.value)<0})}}class wp extends An{constructor(t){super(t),this.expr=t}Ur(t,e){return lt(t.value)!==lt(e.value)||Lt(t.value)||Lt(e.value)?E.newValue(_t):E.newValue({booleanValue:Ot(t.value,e.value)>0})}}class Ip extends An{constructor(t){super(t),this.expr=t}Ur(t,e){return lt(t.value)!==lt(e.value)||Lt(t.value)||Lt(e.value)?E.newValue(_t):he(t.value,e.value)==="EQ"?E.newValue(kt):E.newValue({booleanValue:Ot(t.value,e.value)>0})}}class Ap{constructor(t){this.expr=t}evaluate(t,e){throw new Error("Unimplemented")}}class Vp{constructor(t){this.expr=t}evaluate(t,e){var s;M(this.expr.params.length===1,216);const r=$(this.expr.params[0]).evaluate(t,e);switch(r.type){case"NULL":return E.Dr();case"ARRAY":{const o=((s=r.value.arrayValue)==null?void 0:s.values)??[];return E.newValue({arrayValue:{values:[...o].reverse()}})}default:return E.vr()}}}class Rp{constructor(t){this.expr=t}evaluate(t,e){return M(this.expr.params.length===2,52884),new rl(new P("eq_any",[this.expr.params[1],this.expr.params[0]])).evaluate(t,e)}}class Pp{constructor(t){this.expr=t}evaluate(t,e){var h,f,m,p;M(this.expr.params.length===2,1392);let r=!1;const s=$(this.expr.params[0]).evaluate(t,e);switch(s.type){case"ARRAY":break;case"NULL":r=!0;break;default:return E.vr()}const o=$(this.expr.params[1]).evaluate(t,e);switch(o.type){case"ARRAY":break;case"NULL":r=!0;break;default:return E.vr()}if(r)return E.Dr();const a=((f=(h=o.value)==null?void 0:h.arrayValue)==null?void 0:f.values)??[],c=((p=(m=s.value)==null?void 0:m.arrayValue)==null?void 0:p.values)??[];for(const V of a){let C=!1;r=!1;for(const x of c){switch(Bt(V)&&Bt(x)?"EQ":he(V,x)){case"EQ":C=!0;break;case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:F(44613,{value:x,search:V})}if(C)break}if(!C)return E.newValue(_t)}return E.newValue(kt)}}class Sp{constructor(t){this.expr=t}evaluate(t,e){var h,f,m,p;M(this.expr.params.length===2,2680);let r=!1;const s=$(this.expr.params[0]).evaluate(t,e);switch(s.type){case"ARRAY":break;case"NULL":r=!0;break;default:return E.vr()}const o=$(this.expr.params[1]).evaluate(t,e);switch(o.type){case"ARRAY":break;case"NULL":r=!0;break;default:return E.vr()}if(r)return E.Dr();const a=((f=(h=o.value)==null?void 0:h.arrayValue)==null?void 0:f.values)??[],c=((p=(m=s.value)==null?void 0:m.arrayValue)==null?void 0:p.values)??[];for(const V of c)for(const C of a)switch(Bt(V)&&Bt(C)?"EQ":he(V,C)){case"EQ":return E.newValue(kt);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":r=!0;break;default:F(44608,{value:V,search:C})}return r?E.Dr():E.newValue(_t)}}class Cp{constructor(t){this.expr=t}evaluate(t,e){var s,o,a;M(this.expr.params.length===1,38605);const r=$(this.expr.params[0]).evaluate(t,e);switch(r.type){case"NULL":return E.Dr();case"ARRAY":return E.newValue({integerValue:`${((a=(o=(s=r.value)==null?void 0:s.arrayValue)==null?void 0:o.values)==null?void 0:a.length)??0}`});default:return E.vr()}}}class bp{constructor(t){this.expr=t}evaluate(t,e){throw new Error("Unimplemented")}}class xp{constructor(t){this.expr=t}evaluate(t,e){var s,o;M(this.expr.params.length===1,1508);const r=$(this.expr.params[0]).evaluate(t,e);switch(r.type){case"NULL":return E.Dr();case"BYTES":{const a=(s=r.value)==null?void 0:s.bytesValue;if(typeof a=="string"){const c=ct.fromBase64String(a).toUint8Array();return c.reverse(),E.newValue({bytesValue:ct.fromUint8Array(c).toBase64()})}return E.newValue({bytesValue:new Uint8Array(a).reverse()})}case"STRING":{const a=(o=r.value)==null?void 0:o.stringValue,c=new Intl.__PRIVATE_Segmenter(void 0,{granularity:"grapheme"}).segment(a),h=Array.from(c,(f=>f.segment)).reverse();return E.newValue({stringValue:h.join("")})}default:return E.vr()}}}class Dp{constructor(t){this.expr=t}evaluate(t,e){throw new Error("Unimplemented")}}class Np{constructor(t){this.expr=t}evaluate(t,e){throw new Error("Unimplemented")}}class kp{constructor(t){this.expr=t}evaluate(t,e){M(this.expr.params.length===1,19400);const r=$(this.expr.params[0]).evaluate(t,e);switch(r.type){case"NULL":return E.Dr();case"STRING":{const s=(function(a){let c=0;for(let h=0;h<a.length;h++){const f=a.codePointAt(h);if(f===void 0)return;if(f<=65535)if(f>=55296&&f<=57343)if(f<=56319){const m=a.codePointAt(h+1);m!==void 0&&m>=56320&&m<=57343?(c+=1,h++):c+=1}else c+=1;else c+=1;else{if(!(f<=1114111))return;c+=1,h++}}return c})(r.value.stringValue);return s===void 0?E.vr():E.newValue({integerValue:s})}default:return E.vr()}}}class Op{constructor(t){this.expr=t}evaluate(t,e){var s,o;M(this.expr.params.length===1,8486);const r=$(this.expr.params[0]).evaluate(t,e);switch(r.type){case"BYTES":{const a=(s=r.value)==null?void 0:s.bytesValue;return typeof a=="string"?E.newValue({integerValue:ct.fromBase64String(a).toUint8Array().length}):E.newValue({integerValue:new Uint8Array(a).length})}case"STRING":{const a=(function(h){let f=0;for(let m=0;m<h.length;m++){const p=h.codePointAt(m);if(p===void 0)return;if(p>=55296&&p<=57343){if(!(p<=56319))return;{const V=h.codePointAt(m+1);if(V===void 0||!(V>=56320&&V<=57343))return;f+=4,m++}}else if(p<=127)f+=1;else if(p<=2047)f+=2;else if(p<=65535)f+=3;else{if(!(p<=1114111))return;f+=4,m++}}return f})((o=r.value)==null?void 0:o.stringValue);return a===void 0?E.vr():E.newValue({integerValue:a})}case"NULL":return E.Dr();default:return E.vr()}}}class Vn{constructor(t){this.expr=t}evaluate(t,e){var a,c;M(this.expr.params.length===2,39773,`${this.expr.name}() function should have exactly two parameters`);let r=!1;const s=$(this.expr.params[0]).evaluate(t,e);switch(s.type){case"STRING":break;case"NULL":r=!0;break;default:return E.vr()}const o=$(this.expr.params[1]).evaluate(t,e);switch(o.type){case"STRING":break;case"NULL":r=!0;break;default:return E.vr()}return r?E.Dr():this.kr((a=s.value)==null?void 0:a.stringValue,(c=o.value)==null?void 0:c.stringValue)}}class Lp extends Vn{kr(t,e){try{const r=(function(a){let c="";for(let h=0;h<a.length;h++){const f=a.charAt(h);switch(f){case"_":c+=".";break;case"%":c+=".*";break;case"\\":case".":case"*":case"?":case"+":case"^":case"$":case"|":case"(":case")":case"[":case"]":case"{":case"}":c+="\\"+f;break;default:c+=f}}return"^"+c+"$"})(e),s=qi.compile(r);return E.newValue({booleanValue:s.matches(t)})}catch(r){return Ht(`Invalid LIKE pattern converted to regex: ${e}, returning error. Error: ${r}`),E.vr()}}}class Mp extends Vn{kr(t,e){try{const r=qi.compile(e);return E.newValue({booleanValue:r.matcher(t).find()})}catch{return Ht(`Invalid regex pattern found in regex_contains: ${e}, returning error`),E.vr()}}}class Up extends Vn{kr(t,e){try{return E.newValue({booleanValue:qi.compile(e).matches(t)})}catch{return Ht(`Invalid regex pattern found in regex_match: ${e}, returning error`),E.vr()}}}class Fp extends Vn{kr(t,e){return E.newValue({booleanValue:t.includes(e)})}}class Bp extends Vn{kr(t,e){return E.newValue({booleanValue:t.startsWith(e)})}}class $p extends Vn{kr(t,e){return E.newValue({booleanValue:t.endsWith(e)})}}class qp{constructor(t){this.expr=t}evaluate(t,e){var s,o;M(this.expr.params.length===1,29079);const r=$(this.expr.params[0]).evaluate(t,e);switch(r.type){case"STRING":return E.newValue({stringValue:(o=(s=r.value)==null?void 0:s.stringValue)==null?void 0:o.toLowerCase()});case"NULL":return E.Dr();default:return E.vr()}}}class jp{constructor(t){this.expr=t}evaluate(t,e){var s,o;M(this.expr.params.length===1,60487);const r=$(this.expr.params[0]).evaluate(t,e);switch(r.type){case"STRING":return E.newValue({stringValue:(o=(s=r.value)==null?void 0:s.stringValue)==null?void 0:o.toUpperCase()});case"NULL":return E.Dr();default:return E.vr()}}}class zp{constructor(t){this.expr=t}evaluate(t,e){var s,o;M(this.expr.params.length===1,28544);const r=$(this.expr.params[0]).evaluate(t,e);switch(r.type){case"STRING":return E.newValue({stringValue:(o=(s=r.value)==null?void 0:s.stringValue)==null?void 0:o.trim()});case"NULL":return E.Dr();default:return E.vr()}}}class Gp{constructor(t){this.expr=t}evaluate(t,e){const r=this.expr.params.map((a=>$(a).evaluate(t,e)));let s="",o=!1;for(const a of r)switch(a.type){case"STRING":s+=a.value.stringValue;break;case"NULL":o=!0;break;default:return E.vr()}return o?E.Dr():E.newValue({stringValue:s})}}class Hp{constructor(t){this.expr=t}evaluate(t,e){var a,c,h,f;M(this.expr.params.length===2,4483);const r=$(this.expr.params[0]).evaluate(t,e);switch(r.type){case"UNSET":return E.Sr();case"MAP":break;default:return E.vr()}const s=$(this.expr.params[1]).evaluate(t,e);if(s.type!=="STRING")return E.vr();const o=(f=(c=(a=r.value)==null?void 0:a.mapValue)==null?void 0:c.fields)==null?void 0:f[(h=s.value)==null?void 0:h.stringValue];return o===void 0?E.Sr():E.newValue(o)}}class ho{constructor(t){this.expr=t}evaluate(t,e){var f,m;M(this.expr.params.length===2,25231,`${this.expr.name}() function should have exactly 2 params`);let r=!1;const s=$(this.expr.params[0]).evaluate(t,e);switch(s.type){case"VECTOR":break;case"NULL":r=!0;break;default:return E.vr()}const o=$(this.expr.params[1]).evaluate(t,e);switch(o.type){case"VECTOR":break;case"NULL":r=!0;break;default:return E.vr()}if(r)return E.Dr();const a=Pi(s.value),c=Pi(o.value);if(a===void 0||c===void 0||((f=a.values)==null?void 0:f.length)!==((m=c.values)==null?void 0:m.length))return E.vr();const h=this.qr(a,c);return h===void 0||isNaN(h)?E.vr():E.newValue({doubleValue:h})}}class Qp extends ho{qr(t,e){const r=(t==null?void 0:t.values)??[],s=(e==null?void 0:e.values)??[];if(r.length===0)return;let o=0,a=0,c=0;for(let f=0;f<r.length;f++){if(!Se(r[f])||!Se(s[f]))return;const m=Et(r[f]),p=Et(s[f]);o+=m*p,a+=m*m,c+=p*p}const h=Math.sqrt(a)*Math.sqrt(c);if(h!==0)return 1-Math.max(-1,Math.min(1,o/h))}}class Kp extends ho{qr(t,e){const r=(t==null?void 0:t.values)??[],s=(e==null?void 0:e.values)??[];if(r.length===0)return 0;let o=0;for(let a=0;a<r.length;a++){if(!Se(r[a])||!Se(s[a]))return;o+=Et(r[a])*Et(s[a])}return o}}class Wp extends ho{qr(t,e){const r=(t==null?void 0:t.values)??[],s=(e==null?void 0:e.values)??[];if(r.length===0)return 0;let o=0;for(let a=0;a<r.length;a++){if(!Se(r[a])||!Se(s[a]))return;const c=Et(r[a]),h=Et(s[a]);o+=Math.pow(c-h,2)}return Math.sqrt(o)}}class Yp{constructor(t){this.expr=t}evaluate(t,e){var s;M(this.expr.params.length===1,39044);const r=$(this.expr.params[0]).evaluate(t,e);switch(r.type){case"VECTOR":{const o=Pi(r.value);return E.newValue({integerValue:((s=o==null?void 0:o.values)==null?void 0:s.length)??0})}case"NULL":return E.Dr();default:return E.vr()}}}const gr=BigInt(-62135596800),_r=BigInt(253402300799),Es=BigInt(1e3),Ae=BigInt(1e6),Jp=gr*Es,Xp=_r*Es+BigInt(999),Zp=gr*Ae,tg=_r*Ae+BigInt(999999);function fo(n){return n>=Zp&&n<=tg}function sl(n){return n>=gr&&n<=_r}function yr(n,t){const e=BigInt(n);return!(e<gr||e>_r)&&!(t<0||t>=1e9)&&(e!==gr||t===0)&&!(e===_r&&t>999999999)}function il(n,t){return t<0?{seconds:n-1,nanos:t+1e9}:{seconds:n,nanos:t}}function mo(n){return BigInt(n.seconds)*Ae+BigInt(Math.trunc(n.nanoseconds/1e3))}class po{constructor(t){this.expr=t}evaluate(t,e){M(this.expr.params.length===1,49262,`${this.expr.name}() function should have exactly one parameter`);const r=$(this.expr.params[0]).evaluate(t,e);switch(r.type){case"INT":return this.toTimestamp(BigInt(r.value.integerValue));case"NULL":return E.Dr();default:return E.vr()}}}class eg extends po{toTimestamp(t){if(!fo(t))return E.vr();let e=Number(t/Ae),r=Number(t%Ae*BigInt(1e3));const s=il(e,r);return e=s.seconds,r=s.nanos,yr(e,r)?E.newValue({timestampValue:{seconds:e,nanos:r}}):E.vr()}}class ng extends po{toTimestamp(t){if(!(function(a){return a>=Jp&&a<=Xp})(t))return E.vr();let e=Number(t/Es),r=Number(t%Es*BigInt(1e6));const s=il(e,r);return e=s.seconds,r=s.nanos,yr(e,r)?E.newValue({timestampValue:{seconds:e,nanos:r}}):E.vr()}}class rg extends po{toTimestamp(t){if(!sl(t))return E.vr();const e=Number(t);return E.newValue({timestampValue:{seconds:e,nanos:0}})}}class go{constructor(t){this.expr=t}evaluate(t,e){M(this.expr.params.length===1,1265,`${this.expr.name}() function should have exactly one parameter`);const r=$(this.expr.params[0]).evaluate(t,e);switch(r.type){case"TIMESTAMP":break;case"NULL":return E.Dr();default:return E.vr()}const s=eo(r.value.timestampValue);return yr(s.seconds,s.nanoseconds)?this.$r(s):E.vr()}}class sg extends go{$r(t){const e=mo(t);return fo(e)?E.newValue({integerValue:`${e.toString()}`}):E.vr()}}class ig extends go{$r(t){const e=mo(t),r=e/BigInt(1e3),s=e%BigInt(1e3);return r>BigInt(0)||s===BigInt(0)?E.newValue({integerValue:r.toString()}):E.newValue({integerValue:(r-BigInt(1)).toString()})}}class og extends go{$r(t){const e=BigInt(t.seconds);return sl(e)?E.newValue({integerValue:e.toString()}):E.vr()}}class ol{constructor(t){this.expr=t}evaluate(t,e){M(this.expr.params.length===3,2775,`${this.expr.name}() function should have exactly 3 parameters`);let r=!1;const s=$(this.expr.params[0]).evaluate(t,e);switch(s.type){case"TIMESTAMP":break;case"NULL":r=!0;break;default:return E.vr()}const o=$(this.expr.params[1]).evaluate(t,e);let a;switch(o.type){case"STRING":if(a=(function(J){switch(J){case"microsecond":return"microsecond";case"millisecond":return"millisecond";case"second":return"second";case"minute":return"minute";case"hour":return"hour";case"day":return"day";default:return}})(o.value.stringValue),a===void 0)return E.vr();break;case"NULL":r=!0;break;default:return E.vr()}const c=$(this.expr.params[2]).evaluate(t,e);switch(c.type){case"INT":break;case"NULL":r=!0;break;default:return E.vr()}if(r)return E.Dr();const h=BigInt(c.value.integerValue);let f;try{switch(a){case"microsecond":f=h;break;case"millisecond":f=h*BigInt(1e3);break;case"second":f=h*BigInt(1e6);break;case"minute":f=h*BigInt(6e7);break;case"hour":f=h*BigInt(36e8);break;case"day":f=h*BigInt(864e8);break;default:return E.vr()}if(a!=="microsecond"&&h!==BigInt(0)&&f/h!==BigInt(this.Kr(a)))return E.vr()}catch(Q){return Ht(`Error during timestamp arithmetic: ${Q}`),E.vr()}const m=eo(s.value.timestampValue);if(!yr(m.seconds,m.nanoseconds))return E.vr();const p=mo(m),V=this.Wr(p,f);if(!fo(V))return E.vr();const C=Number(V/Ae),x=V%Ae,B=Number((x<0?x+Ae:x)*BigInt(1e3)),L=x<0?C-1:C;return yr(L,B)?E.newValue({timestampValue:{seconds:L,nanos:B}}):E.vr()}Kr(t){switch(t){case"millisecond":return 1e3;case"second":return 1e6;case"minute":return 6e7;case"hour":return 36e8;case"day":return 864e8;default:return 1}}}class ag extends ol{Wr(t,e){return t+e}}class ug extends ol{Wr(t,e){return t-e}}function Er(n){if((n=nl(n))instanceof wn)return`fld(${n.fieldName})`;if(n instanceof In)return`cst(${(function(e){return e===null?"null":typeof e=="number"?e.toString():typeof e=="string"?`"${e}"`:e instanceof at?`ref(${e.path})`:e instanceof Nt?`vec(${JSON.stringify(e)})`:JSON.stringify(e)})(n.value)})`;if(n instanceof P)return`fn(${n.name},[${n.params.map(Er).join(",")}])`;if(n.expressionType==="ListOfExpressions")return`list([${n.Rr.map(Er).join(",")}])`;throw new Error(`Unrecognized expr ${JSON.stringify(n,null,2)}`)}function cg(n){if(n instanceof Zc)return`${n._name}(${Yr(n.fields)})`;if(n instanceof tl){let t=`${n._name}(${Yr(n.accumulators)})`;return n.groups.size>0&&(t+=`grouping(${Yr(n.groups)})`),t}if(n instanceof el)return`${n._name}(${Yr(n.groups)})`;if(n instanceof ks)return`${n._name}(${n.Vr})`;if(n instanceof Os)return`${n._name}(${n.collectionId})`;if(n instanceof oo)return`${n._name}()`;if(n instanceof ao)return`${n._name}(${n.dr.sort()})`;if(n instanceof Ls)return`${n._name}(${Er(n.condition)})`;if(n instanceof Ke)return`${n._name}(${n.limit})`;if(n instanceof ie)return`${n._name}(${(function(e){return e.map((r=>`${Er(r.expr)}${r.direction}`)).join(",")})(n.orderings)})`;throw new Error(`Unrecognized stage ${n._name}`)}function Yr(n){return`${Array.from(n.entries()).sort().map((([t,e])=>`${t}=${Er(e)}`)).join(",")}`}function ue(n){return n.stages.map((t=>cg(t))).join("|")}function al(n,t){return ue(n)===ue(t)}function mt(n){return n instanceof Ct}function Tu(n){return mt(n)?ue(n):Xn(n)}function ul(n){return mt(n)?ue(n):(function(e){return`${Tc(Zt(e))}|lt:${e.limitType}`})(n)}function Fs(n,t){return n instanceof Ct&&t instanceof Ct?al(n,t):!(n instanceof Ct&&!(t instanceof Ct)||!(n instanceof Ct)&&t instanceof Ct)&&Ld(n,t)}function cl(n){return $e(n)?ue(n):Tc(n)}function ll(n,t){return n instanceof Ct&&t instanceof Ct?al(n,t):!(n instanceof Ct&&!(t instanceof Ct)||!(n instanceof Ct)&&t instanceof Ct)&&vc(n,t)}function lg(n,t){const e=(function(s){let o=!1;const a=[];for(const c of s)if(c instanceof ie)if(o=!0,c.orderings.some((h=>h.expr instanceof wn&&h.expr.fieldName===Yt)))a.push(c);else{const h=c.orderings.map((f=>f));h.push(ns(Yt).ascending()),a.push(new ie(h,{}))}else c instanceof Ke&&(o||(a.push(new ie([ns(Yt).ascending()],{})),o=!0)),a.push(c);return o||a.push(new ie([ns(Yt).ascending()],{})),a})(n.stages);if(n.userDataReader){const r=n.userDataReader.createContext(3,"toCorePipeline");e.forEach((s=>s._readUserData(r)))}return new Ct(n.userDataReader.serializer,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hg{constructor(t,e,r,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(t,e){const r=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const o=this.mutations[s];o.key.isEqual(t.key)&&Ed(o,t,r[s])}}applyToLocalView(t,e){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(e=Yn(r,t,e,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(e=Yn(r,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const r=Rc();return this.mutations.forEach((s=>{const o=t.get(s.key),a=o.overlayedDocument;let c=this.applyToLocalView(a,o.mutatedFields);c=e.has(s.key)?null:c;const h=fc(a,c);h!==null&&r.set(s.key,h),a.isValidDocument()||a.convertToNoDocument(q.min())})),r}keys(){return this.mutations.reduce(((t,e)=>t.add(e.key)),G())}isEqual(t){return this.batchId===t.batchId&&hn(this.mutations,t.mutations,((e,r)=>Xa(e,r)))&&hn(this.baseMutations,t.baseMutations,((e,r)=>Xa(e,r)))}}class _o{constructor(t,e,r,s){this.batch=t,this.commitVersion=e,this.mutationResults=r,this.docVersions=s}static from(t,e,r){M(t.mutations.length===r.length,58842,{Qr:t.mutations.length,Gr:r.length});let s=(function(){return $d})();const o=t.mutations;for(let a=0;a<o.length;a++)s=s.insert(o[a].key,r[a].version);return new _o(t,e,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fg{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oe{constructor(t,e,r,s,o=q.min(),a=q.min(),c=ct.EMPTY_BYTE_STRING,h=null){this.target=t,this.targetId=e,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=h}withSequenceNumber(t){return new oe(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new oe(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new oe(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new oe(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dg{constructor(t){this.zr=t}}function mg(n){const t=sm({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Ci(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pg{constructor(){this.Hi=new gg}addToCollectionParentIndex(t,e){return this.Hi.add(e),S.resolve()}getCollectionParents(t,e){return S.resolve(this.Hi.getEntries(e))}addFieldIndex(t,e){return S.resolve()}deleteFieldIndex(t,e){return S.resolve()}deleteAllFieldIndexes(t){return S.resolve()}createTargetIndexes(t,e){return S.resolve()}getDocumentsMatchingTarget(t,e){return S.resolve(null)}getIndexType(t,e){return S.resolve(0)}getFieldIndexes(t,e){return S.resolve([])}getNextCollectionGroupToUpdate(t){return S.resolve(null)}getMinOffset(t,e){return S.resolve(Ve.min())}getMinOffsetFromCollectionGroup(t,e){return S.resolve(Ve.min())}updateCollectionGroup(t,e,r){return S.resolve()}updateIndexEntries(t,e){return S.resolve()}}class gg{constructor(){this.index={}}add(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e]||new ut(Y.comparator),o=!s.has(r);return this.index[e]=s.add(r),o}has(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e];return s&&s.has(r)}getEntries(t){return(this.index[t]||new ut(Y.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(t){this.Ds=t}next(){return this.Ds+=2,this.Ds}static xs(){return new xe(0)}static Cs(){return new xe(-1)}}// Copyright 2024 Google LLC* @license
function hl(n,t){var r;let e=t;for(const s of n.stages)e=yg({serializer:n.serializer,serverTimestampBehavior:(r=n.listenOptions)==null?void 0:r.serverTimestampBehavior},s,e);return e}function Bs(n,t){return hl(n,[t]).length>0}function _g(n,t){return mt(n)?Bs(n,t):bs(n,t)}function yg(n,t,e){if(t instanceof ks)return(function(s,o,a){return a.filter((c=>c.isFoundDocument()&&`/${c.key.getCollectionPath().canonicalString()}`===o.Vr))})(0,t,e);if(t instanceof Ls)return(function(s,o,a){return a.filter((c=>{const h=er($(o.condition).evaluate(s,c));return h!==void 0&&zt(h,kt)}))})(n,t,e);if(t instanceof Os)return(function(s,o,a){return a.filter((c=>c.isFoundDocument()&&c.key.getCollectionPath().lastSegment()===o.collectionId))})(0,t,e);if(t instanceof oo)return(function(s,o,a){return a.filter((c=>c.isFoundDocument()))})(0,0,e);if(t instanceof ao)return(function(s,o,a){return a.filter((c=>c.isFoundDocument()&&o.mr.has(c.key.path.toStringWithLeadingSlash())))})(0,t,e);if(t instanceof Ke)return(function(s,o,a){return a.slice(0,o.limit)})(0,t,e);if(t instanceof ie)return(function(s,o,a){const c=o.orderings.map((h=>({ks:$(h.expr),direction:h.direction})));return[...a].sort(((h,f)=>{for(const{ks:m,direction:p}of c){const V=er(m.evaluate(s,h)),C=er(m.evaluate(s,f)),x=Ot(V??dn,C??dn);if(x!==0)return p==="ascending"?x:-x}return 0}))})(n,t,e);throw new Error(`Unknown stage: ${t._name}`)}function Oi(n){const t=(function(r){for(let s=r.stages.length-1;s>=0;s--){const o=r.stages[s];if(o instanceof ie)return o.orderings}throw new Error("Pipeline must contain at least one Sort stage")})(n);return(e,r)=>{for(const s of t){const o=er($(s.expr).evaluate({serializer:n.serializer},e)),a=er($(s.expr).evaluate({serializer:n.serializer},r)),c=Ot(o||dn,a||dn);if(c!==0)return s.direction==="ascending"?c:-c}return 0}}function yi(n){for(let t=n.stages.length-1;t>=0;t--){const e=n.stages[t];if(e instanceof Ke)return{limit:e.limit}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eg{constructor(){this.changes=new Je((t=>t.toString()),((t,e)=>t.isEqual(e))),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,Vt.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const r=this.changes.get(e);return r!==void 0?S.resolve(r):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tg{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vg{constructor(t,e,r,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=r,this.indexManager=s}getDocument(t,e){let r=null;return this.documentOverlayCache.getOverlay(t,e).next((s=>(r=s,this.remoteDocumentCache.getEntry(t,e)))).next((s=>(r!==null&&Yn(r.mutation,s,Gt.empty(),tt.now()),s)))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next((r=>this.getLocalViewOfDocuments(t,r,G()).next((()=>r))))}getLocalViewOfDocuments(t,e,r=G()){const s=ye();return this.populateOverlays(t,s,e).next((()=>this.computeViews(t,e,s,r).next((o=>{let a=sn();return o.forEach(((c,h)=>{a=a.insert(c,h.overlayedDocument)})),a}))))}getOverlayedDocuments(t,e){const r=ye();return this.populateOverlays(t,r,e).next((()=>this.computeViews(t,e,r,G())))}populateOverlays(t,e,r){const s=[];return r.forEach((o=>{e.has(o)||s.push(o)})),this.documentOverlayCache.getOverlays(t,s).next((o=>{o.forEach(((a,c)=>{e.set(a,c)}))}))}computeViews(t,e,r,s){let o=Dt();const a=Zn(),c=(function(){return Zn()})();return e.forEach(((h,f)=>{const m=r.get(f.key);s.has(f.key)&&(m===void 0||m.mutation instanceof Ye)?o=o.insert(f.key,f):m!==void 0?(a.set(f.key,m.mutation.getFieldMask()),Yn(m.mutation,f,m.mutation.getFieldMask(),tt.now())):a.set(f.key,Gt.empty())})),this.recalculateAndSaveOverlays(t,o).next((h=>(h.forEach(((f,m)=>a.set(f,m))),e.forEach(((f,m)=>c.set(f,new Tg(m,a.get(f)??null)))),c)))}recalculateAndSaveOverlays(t,e){const r=Zn();let s=new et(((a,c)=>a-c)),o=G();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next((a=>{for(const c of a)c.keys().forEach((h=>{const f=e.get(h);if(f===null)return;let m=r.get(h)||Gt.empty();m=c.applyToLocalView(f,m),r.set(h,m);const p=(s.get(c.batchId)||G()).add(h);s=s.insert(c.batchId,p)}))})).next((()=>{const a=[],c=s.getReverseIterator();for(;c.hasNext();){const h=c.getNext(),f=h.key,m=h.value,p=Rc();m.forEach((V=>{if(!o.has(V)){const C=fc(e.get(V),r.get(V));C!==null&&p.set(V,C),o=o.add(V)}})),a.push(this.documentOverlayCache.saveOverlays(t,f,p))}return S.waitFor(a)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next((r=>this.recalculateAndSaveOverlays(t,r)))}getDocumentsMatchingQuery(t,e,r,s){return mt(e)?this.getDocumentsMatchingPipeline(t,e,r,s):Nd(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):kd(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,r,s):this.getDocumentsMatchingCollectionQuery(t,e,r,s)}getNextDocuments(t,e,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,r,s).next((o=>{const a=s-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,r.largestBatchId,s-o.size):S.resolve(ye());let c=ir,h=o;return a.next((f=>S.forEach(f,((m,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),o.get(m)?S.resolve():this.remoteDocumentCache.getEntry(t,m).next((V=>{h=h.insert(m,V)}))))).next((()=>this.populateOverlays(t,f,o))).next((()=>this.computeViews(t,h,f,G()))).next((m=>({batchId:c,changes:Vc(m)})))))}))}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new U(e)).next((r=>{let s=sn();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(t,e,r,s){const o=e.collectionGroup;let a=sn();return this.indexManager.getCollectionParents(t,o).next((c=>S.forEach(c,(h=>{const f=(function(p,V){return new Cs(V,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)})(e,h.child(o));return this.getDocumentsMatchingCollectionQuery(t,f,r,s).next((m=>{m.forEach(((p,V)=>{a=a.insert(p,V)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(t,e,r,s){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,r.largestBatchId).next((a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,o,s)))).next((a=>this.retrieveMatchingLocalDocuments(o,a,(c=>bs(e,c)))))}getDocumentsMatchingPipeline(t,e,r,s){if(Ie(e)==="collection_group"){const o=co(e);let a=sn();return this.indexManager.getCollectionParents(t,o).next((c=>S.forEach(c,(h=>{const f=(function(p,V){const C=p.stages.map((x=>x instanceof Os?new ks(V.canonicalString(),{}):x));return new Ct(p.serializer,C)})(e,h.child(o));return this.getDocumentsMatchingPipeline(t,f,r,s).next((m=>{m.forEach(((p,V)=>{a=a.insert(p,V)}))}))})).next((()=>a))))}{let o;return this.getOverlaysForPipeline(t,e,r.largestBatchId).next((a=>{switch(o=a,Ie(e)){case"collection":return this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,o,s);case"documents":let c=G();for(const h of ki(e))c=c.add(U.fromPath(h));return this.remoteDocumentCache.getEntries(t,c);case"database":return this.remoteDocumentCache.getAllEntries(t);default:throw new O("invalid-argument",`Invalid pipeline source to execute offline: ${ue(e)}`)}})).next((a=>this.retrieveMatchingLocalDocuments(o,a,(c=>Bs(e,c)))))}}retrieveMatchingLocalDocuments(t,e,r){t.forEach(((o,a)=>{const c=a.getKey();e.get(c)===null&&(e=e.insert(c,Vt.newInvalidDocument(c)))}));let s=sn();return e.forEach(((o,a)=>{const c=t.get(o);c!==void 0&&Yn(c.mutation,a,Gt.empty(),tt.now()),r(a)&&(s=s.insert(o,a))})),s}getOverlaysForPipeline(t,e,r){switch(Ie(e)){case"collection":return this.documentOverlayCache.getOverlaysForCollection(t,Y.fromString(Ms(e)),r);case"collection_group":throw new O("invalid-argument",`Unexpected collection group pipeline: ${ue(e)}`);case"documents":return this.documentOverlayCache.getOverlays(t,ki(e).map((s=>U.fromPath(s))));case"database":return this.documentOverlayCache.getAllOverlays(t,r);default:throw new O("invalid-argument",`Failed to get overlays for pipeline: ${ue(e)}`)}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wg{constructor(t){this.serializer=t,this.Hs=new Map,this.Js=new Map}getBundleMetadata(t,e){return S.resolve(this.Hs.get(e))}saveBundleMetadata(t,e){return this.Hs.set(e.id,(function(s){return{id:s.id,version:s.version,createTime:te(s.createTime)}})(e)),S.resolve()}getNamedQuery(t,e){return S.resolve(this.Js.get(e))}saveNamedQuery(t,e){return this.Js.set(e.name,(function(s){return{name:s.name,query:mg(s.bundledQuery),readTime:te(s.readTime)}})(e)),S.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ig{constructor(){this.overlays=new et(U.comparator),this.Ys=new Map}getOverlay(t,e){return S.resolve(this.overlays.get(e))}getOverlays(t,e){const r=ye();return S.forEach(e,(s=>this.getOverlay(t,s).next((o=>{o!==null&&r.set(s,o)})))).next((()=>r))}getAllOverlays(t,e){const r=ye();return this.overlays.forEach(((s,o)=>{o.largestBatchId>e&&r.set(s,o)})),S.resolve(r)}saveOverlays(t,e,r){return r.forEach(((s,o)=>{this.Hr(t,e,o)})),S.resolve()}removeOverlaysForBatchId(t,e,r){const s=this.Ys.get(r);return s!==void 0&&(s.forEach((o=>this.overlays=this.overlays.remove(o))),this.Ys.delete(r)),S.resolve()}getOverlaysForCollection(t,e,r){const s=ye(),o=e.length+1,a=new U(e.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const h=c.getNext().value,f=h.getKey();if(!e.isPrefixOf(f.path))break;f.path.length===o&&h.largestBatchId>r&&s.set(h.getKey(),h)}return S.resolve(s)}getOverlaysForCollectionGroup(t,e,r,s){let o=new et(((f,m)=>f-m));const a=this.overlays.getIterator();for(;a.hasNext();){const f=a.getNext().value;if(f.getKey().getCollectionGroup()===e&&f.largestBatchId>r){let m=o.get(f.largestBatchId);m===null&&(m=ye(),o=o.insert(f.largestBatchId,m)),m.set(f.getKey(),f)}}const c=ye(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach(((f,m)=>c.set(f,m))),!(c.size()>=s)););return S.resolve(c)}Hr(t,e,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Ys.get(s.largestBatchId).delete(r.key);this.Ys.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new fg(e,r));let o=this.Ys.get(e);o===void 0&&(o=G(),this.Ys.set(e,o)),this.Ys.set(e,o.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ag{constructor(){this.sessionToken=ct.EMPTY_BYTE_STRING}getSessionToken(t){return S.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,S.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yo{constructor(){this.Zs=new ut(gt.Xs),this.e_=new ut(gt.t_)}isEmpty(){return this.Zs.isEmpty()}addReference(t,e){const r=new gt(t,e);this.Zs=this.Zs.add(r),this.e_=this.e_.add(r)}n_(t,e){t.forEach((r=>this.addReference(r,e)))}removeReference(t,e){this.r_(new gt(t,e))}i_(t,e){t.forEach((r=>this.removeReference(r,e)))}s_(t){const e=new U(new Y([])),r=new gt(e,t),s=new gt(e,t+1),o=[];return this.e_.forEachInRange([r,s],(a=>{this.r_(a),o.push(a.key)})),o}__(){this.Zs.forEach((t=>this.r_(t)))}r_(t){this.Zs=this.Zs.delete(t),this.e_=this.e_.delete(t)}o_(t){const e=new U(new Y([])),r=new gt(e,t),s=new gt(e,t+1);let o=G();return this.e_.forEachInRange([r,s],(a=>{o=o.add(a.key)})),o}containsKey(t){const e=new gt(t,0),r=this.Zs.firstAfterOrEqual(e);return r!==null&&t.isEqual(r.key)}}class gt{constructor(t,e){this.key=t,this.a_=e}static Xs(t,e){return U.comparator(t.key,e.key)||H(t.a_,e.a_)}static t_(t,e){return H(t.a_,e.a_)||U.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vg{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.gs=1,this.u_=new ut(gt.Xs)}checkEmpty(t){return S.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,r,s){const o=this.gs;this.gs++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new hg(o,e,r,s);this.mutationQueue.push(a);for(const c of s)this.u_=this.u_.add(new gt(c.key,o)),this.indexManager.addToCollectionParentIndex(t,c.key.path.popLast());return S.resolve(a)}lookupMutationBatch(t,e){return S.resolve(this.c_(e))}getNextMutationBatchAfterBatchId(t,e){const r=e+1,s=this.l_(r),o=s<0?0:s;return S.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return S.resolve(this.mutationQueue.length===0?Qi:this.gs-1)}getAllMutationBatches(t){return S.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const r=new gt(e,0),s=new gt(e,Number.POSITIVE_INFINITY),o=[];return this.u_.forEachInRange([r,s],(a=>{const c=this.c_(a.a_);o.push(c)})),S.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let r=new ut(H);return e.forEach((s=>{const o=new gt(s,0),a=new gt(s,Number.POSITIVE_INFINITY);this.u_.forEachInRange([o,a],(c=>{r=r.add(c.a_)}))})),S.resolve(this.E_(r))}getAllMutationBatchesAffectingQuery(t,e){const r=e.path,s=r.length+1;let o=r;U.isDocumentKey(o)||(o=o.child(""));const a=new gt(new U(o),0);let c=new ut(H);return this.u_.forEachWhile((h=>{const f=h.key.path;return!!r.isPrefixOf(f)&&(f.length===s&&(c=c.add(h.a_)),!0)}),a),S.resolve(this.E_(c))}E_(t){const e=[];return t.forEach((r=>{const s=this.c_(r);s!==null&&e.push(s)})),e}removeMutationBatch(t,e){M(this.h_(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.u_;return S.forEach(e.mutations,(s=>{const o=new gt(s.key,e.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)})).next((()=>{this.u_=r}))}bs(t){}containsKey(t,e){const r=new gt(e,0),s=this.u_.firstAfterOrEqual(r);return S.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,S.resolve()}h_(t,e){return this.l_(t)}l_(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}c_(t){const e=this.l_(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rg{constructor(t){this.T_=t,this.docs=(function(){return new et(U.comparator)})(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const r=e.key,s=this.docs.get(r),o=s?s.size:0,a=this.T_(e);return this.docs=this.docs.insert(r,{document:e.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const r=this.docs.get(e);return S.resolve(r?r.document.mutableCopy():Vt.newInvalidDocument(e))}getEntries(t,e){let r=Dt();return e.forEach((s=>{const o=this.docs.get(s);r=r.insert(s,o?o.document.mutableCopy():Vt.newInvalidDocument(s))})),S.resolve(r)}getAllEntries(t){let e=Dt();return this.docs.forEach(((r,s)=>{e=e.insert(r,s.document)})),S.resolve(e)}getDocumentsMatchingQuery(t,e,r,s){let o,a;mt(e)?(o=Y.fromString(Ms(e)),a=m=>Bs(e,m)):(o=e.path,a=m=>bs(e,m));let c=Dt();const h=new U(o.child("__id-9223372036854775808__")),f=this.docs.getIteratorFrom(h);for(;f.hasNext();){const{key:m,value:{document:p}}=f.getNext();if(!o.isPrefixOf(m.path))break;m.path.length>o.length+1||ed(td(p),r)<=0||(s.has(p.key)||a(p))&&(c=c.insert(p.key,p.mutableCopy()))}return S.resolve(c)}getAllFromCollectionGroup(t,e,r,s){F(9500)}P_(t,e){return S.forEach(this.docs,(r=>e(r)))}newChangeBuffer(t){return new Pg(this)}getSize(t){return S.resolve(this.size)}}class Pg extends Eg{constructor(t){super(),this.zs=t}applyChanges(t){const e=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?e.push(this.zs.addEntry(t,s)):this.zs.removeEntry(r)})),S.waitFor(e)}getFromCache(t,e){return this.zs.getEntry(t,e)}getAllFromCache(t,e){return this.zs.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sg{constructor(t){this.persistence=t,this.R_=new Je((e=>cl(e)),ll),this.lastRemoteSnapshotVersion=q.min(),this.highestTargetId=0,this.I_=0,this.A_=new yo,this.targetCount=0,this.V_=xe.xs()}forEachTarget(t,e){return this.R_.forEach(((r,s)=>e(s))),S.resolve()}getLastRemoteSnapshotVersion(t){return S.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return S.resolve(this.I_)}allocateTargetId(t){return this.highestTargetId=this.V_.next(),S.resolve(this.highestTargetId)}setTargetsMetadata(t,e,r){return r&&(this.lastRemoteSnapshotVersion=r),e>this.I_&&(this.I_=e),S.resolve()}Ms(t){this.R_.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.V_=new xe(e),this.highestTargetId=e),t.sequenceNumber>this.I_&&(this.I_=t.sequenceNumber)}addTargetData(t,e){return this.Ms(e),this.targetCount+=1,S.resolve()}updateTargetData(t,e){return this.Ms(e),S.resolve()}removeTargetData(t,e){return this.R_.delete(e.target),this.A_.s_(e.targetId),this.targetCount-=1,S.resolve()}removeTargets(t,e,r){let s=0;const o=[];return this.R_.forEach(((a,c)=>{c.sequenceNumber<=e&&r.get(c.targetId)===null&&(this.R_.delete(a),o.push(this.removeMatchingKeysForTargetId(t,c.targetId)),s++)})),S.waitFor(o).next((()=>s))}getTargetCount(t){return S.resolve(this.targetCount)}getTargetData(t,e){const r=this.R_.get(e)||null;return S.resolve(r)}addMatchingKeys(t,e,r){return this.A_.n_(e,r),S.resolve()}removeMatchingKeys(t,e,r){this.A_.i_(e,r);const s=this.persistence.referenceDelegate,o=[];return s&&e.forEach((a=>{o.push(s.markPotentiallyOrphaned(t,a))})),S.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this.A_.s_(e),S.resolve()}getMatchingKeysForTargetId(t,e){const r=this.A_.o_(e);return S.resolve(r)}containsKey(t,e){return S.resolve(this.A_.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fl{constructor(t,e){this.d_={},this.overlays={},this.f_=new Is(0),this.m_=!1,this.m_=!0,this.p_=new Ag,this.referenceDelegate=t(this),this.g_=new Sg(this),this.indexManager=new pg,this.remoteDocumentCache=(function(s){return new Rg(s)})((r=>this.referenceDelegate.y_(r))),this.serializer=new dg(e),this.w_=new wg(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.m_=!1,Promise.resolve()}get started(){return this.m_}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new Ig,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let r=this.d_[t.toKey()];return r||(r=new Vg(e,this.referenceDelegate),this.d_[t.toKey()]=r),r}getGlobalsCache(){return this.p_}getTargetCache(){return this.g_}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.w_}runTransaction(t,e,r){k("MemoryPersistence","Starting transaction:",t);const s=new Cg(this.f_.next());return this.referenceDelegate.b_(),r(s).next((o=>this.referenceDelegate.v_(s).next((()=>o)))).toPromise().then((o=>(s.raiseOnCommittedEvent(),o)))}S_(t,e){return S.or(Object.values(this.d_).map((r=>()=>r.containsKey(t,e))))}}class Cg extends rd{constructor(t){super(),this.currentSequenceNumber=t}}class Eo{constructor(t){this.persistence=t,this.D_=new yo,this.x_=null}static C_(t){return new Eo(t)}get F_(){if(this.x_)return this.x_;throw F(60996)}addReference(t,e,r){return this.D_.addReference(r,e),this.F_.delete(r.toString()),S.resolve()}removeReference(t,e,r){return this.D_.removeReference(r,e),this.F_.add(r.toString()),S.resolve()}markPotentiallyOrphaned(t,e){return this.F_.add(e.toString()),S.resolve()}removeTarget(t,e){this.D_.s_(e.targetId).forEach((s=>this.F_.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,e.targetId).next((s=>{s.forEach((o=>this.F_.add(o.toString())))})).next((()=>r.removeTargetData(t,e)))}b_(){this.x_=new Set}v_(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return S.forEach(this.F_,(r=>{const s=U.fromPath(r);return this.O_(t,s).next((o=>{o||e.removeEntry(s,q.min())}))})).next((()=>(this.x_=null,e.apply(t))))}updateLimboDocument(t,e){return this.O_(t,e).next((r=>{r?this.F_.delete(e.toString()):this.F_.add(e.toString())}))}y_(t){return 0}O_(t,e){return S.or([()=>S.resolve(this.D_.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.S_(t,e)])}}class Ts{constructor(t,e){this.persistence=t,this.M_=new Je((r=>ad(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=Sm(this,e)}static C_(t,e){return new Ts(t,e)}b_(){}v_(t){return S.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}lr(t){const e=this.Ls(t);return this.persistence.getTargetCache().getTargetCount(t).next((r=>e.next((s=>r+s))))}Ls(t){let e=0;return this.Er(t,(r=>{e++})).next((()=>e))}Er(t,e){return S.forEach(this.M_,((r,s)=>this.Us(t,r,s).next((o=>o?S.resolve():e(s)))))}removeTargets(t,e,r){return this.persistence.getTargetCache().removeTargets(t,e,r)}removeOrphanedDocuments(t,e){let r=0;const s=this.persistence.getRemoteDocumentCache(),o=s.newChangeBuffer();return s.P_(t,(a=>this.Us(t,a,e).next((c=>{c||(r++,o.removeEntry(a,q.min()))})))).next((()=>o.apply(t))).next((()=>r))}markPotentiallyOrphaned(t,e){return this.M_.set(e,t.currentSequenceNumber),S.resolve()}removeTarget(t,e){const r=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,r)}addReference(t,e,r){return this.M_.set(r,t.currentSequenceNumber),S.resolve()}removeReference(t,e,r){return this.M_.set(r,t.currentSequenceNumber),S.resolve()}updateLimboDocument(t,e){return this.M_.set(e,t.currentSequenceNumber),S.resolve()}y_(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=Xr(t.data.value)),e}Us(t,e,r){return S.or([()=>this.persistence.S_(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.M_.get(e);return S.resolve(s!==void 0&&s>r)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class To{constructor(t,e,r,s){this.targetId=t,this.fromCache=e,this.wo=r,this.bo=s}static vo(t,e){let r=G(),s=G();for(const o of e.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:s=s.add(o.doc.key)}return new To(t,e.fromCache,r,s)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bg(n,t){return U.comparator(n.key,t.key)}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xg{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dg{constructor(){this.So=!1,this.Do=!1,this.xo=100,this.Co=(function(){return xh()?8:sd(Ch())>0?6:4})()}initialize(t,e){this.Fo=t,this.indexManager=e,this.So=!0}getDocumentsMatchingQuery(t,e,r,s){const o={result:null};return this.Oo(t,e).next((a=>{o.result=a})).next((()=>{if(!o.result)return this.Mo(t,e,s,r).next((a=>{o.result=a}))})).next((()=>{if(o.result)return;const a=new xg;return this.No(t,e,a).next((c=>{if(o.result=c,this.Do)return this.Lo(t,e,a,c.size)}))})).next((()=>o.result))}Lo(t,e,r,s){return mt(e)?S.resolve():r.documentReadCount<this.xo?(rn()<=W.DEBUG&&k("QueryEngine","SDK will not create cache indexes for query:",Xn(e),"since it only creates cache indexes for collection contains","more than or equal to",this.xo,"documents"),S.resolve()):(rn()<=W.DEBUG&&k("QueryEngine","Query:",Xn(e),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Co*s?(rn()<=W.DEBUG&&k("QueryEngine","The SDK decides to create cache indexes for query:",Xn(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Zt(e))):S.resolve())}Oo(t,e){if(mt(e))return S.resolve(null);let r=e;if(su(r))return S.resolve(null);let s=Zt(r);return this.indexManager.getIndexType(t,s).next((o=>o===0?null:(r.limit!==null&&o===1&&(r=Ci(r,null,"F"),s=Zt(r)),this.indexManager.getDocumentsMatchingTarget(t,s).next((a=>{const c=G(...a);return this.Fo.getDocuments(t,c).next((h=>this.indexManager.getMinOffset(t,s).next((f=>{const m=this.Bo(r,h);return this.Uo(r,m,c,f.readTime)?this.Oo(t,Ci(r,null,"F")):this.ko(t,m,r,f)}))))})))))}Mo(t,e,r,s){return(mt(e)?(function(a){for(const c of a.stages){if(c instanceof Ke||c instanceof Eu)return!1;if(c instanceof Ls){if(c.condition instanceof Yc&&c.condition._expr.name==="exists"&&c.condition._expr.params[0]instanceof wn&&c.condition._expr.params[0].fieldName===Yt)continue;return!1}}return!0})(e):su(e))||s.isEqual(q.min())?S.resolve(null):this.Fo.getDocuments(t,r).next((o=>{const a=this.Bo(e,o);return this.Uo(e,a,r,s)?S.resolve(null):(rn()<=W.DEBUG&&k("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Tu(e)),this.ko(t,a,e,Zf(s,ir)).next((c=>c)))}))}Bo(t,e){let r,s;return mt(t)?(r=new ut(bg),s=o=>Bs(t,o)):(r=new ut(Zi(t)),s=o=>bs(t,o)),e.forEach(((o,a)=>{s(a)&&(r=r.add(a))})),r}Uo(t,e,r,s){if(mt(t))return(function(c){return c.stages.some((h=>h instanceof Ke||h instanceof Eu))})(t);if(t.limit===null)return!1;if(r.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(s)>0)}No(t,e,r){return rn()<=W.DEBUG&&k("QueryEngine","Using full collection scan to execute query:",Tu(e)),this.Fo.getDocumentsMatchingQuery(t,e,Ve.min(),r)}ko(t,e,r,s){return this.Fo.getDocumentsMatchingQuery(t,r,s).next((o=>(e.forEach((a=>{o=o.insert(a.key,a)})),o)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vo="LocalStore",Ng=3e8;class kg{constructor(t,e,r,s){this.persistence=t,this.qo=e,this.serializer=s,this.$o=new et(H),this.Ko=new Je((o=>cl(o)),ll),this.Wo=new Map,this.Qo=t.getRemoteDocumentCache(),this.g_=t.getTargetCache(),this.w_=t.getBundleCache(),this.Go(r)}Go(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new vg(this.Qo,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Qo.setIndexManager(this.indexManager),this.qo.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(e=>t.collect(e,this.$o)))}}function Og(n,t,e,r){return new kg(n,t,e,r)}async function dl(n,t){const e=j(n);return await e.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return e.mutationQueue.getAllMutationBatches(r).next((o=>(s=o,e.Go(t),e.mutationQueue.getAllMutationBatches(r)))).next((o=>{const a=[],c=[];let h=G();for(const f of s){a.push(f.batchId);for(const m of f.mutations)h=h.add(m.key)}for(const f of o){c.push(f.batchId);for(const m of f.mutations)h=h.add(m.key)}return e.localDocuments.getDocuments(r,h).next((f=>({zo:f,removedBatchIds:a,addedBatchIds:c})))}))}))}function Lg(n,t){const e=j(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=t.batch.keys(),o=e.Qo.newChangeBuffer({trackRemovals:!0});return(function(c,h,f,m){const p=f.batch,V=p.keys();let C=S.resolve();return V.forEach((x=>{C=C.next((()=>m.getEntry(h,x))).next((B=>{const L=f.docVersions.get(x);M(L!==null,48541),B.version.compareTo(L)<0&&(p.applyToRemoteDocument(B,f),B.isValidDocument()&&(B.setReadTime(f.commitVersion),m.addEntry(B)))}))})),C.next((()=>c.mutationQueue.removeMutationBatch(h,p)))})(e,r,t,o).next((()=>o.apply(r))).next((()=>e.mutationQueue.performConsistencyCheck(r))).next((()=>e.documentOverlayCache.removeOverlaysForBatchId(r,s,t.batch.batchId))).next((()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(c){let h=G();for(let f=0;f<c.mutationResults.length;++f)c.mutationResults[f].transformResults.length>0&&(h=h.add(c.batch.mutations[f].key));return h})(t)))).next((()=>e.localDocuments.getDocuments(r,s)))}))}function ml(n){const t=j(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",(e=>t.g_.getLastRemoteSnapshotVersion(e)))}function Mg(n,t){const e=j(n),r=t.snapshotVersion;let s=e.$o;return e.persistence.runTransaction("Apply remote event","readwrite-primary",(o=>{const a=e.Qo.newChangeBuffer({trackRemovals:!0});s=e.$o;const c=[];t.targetChanges.forEach(((m,p)=>{const V=s.get(p);if(!V)return;c.push(e.g_.removeMatchingKeys(o,m.removedDocuments,p).next((()=>e.g_.addMatchingKeys(o,m.addedDocuments,p))));let C=V.withSequenceNumber(o.currentSequenceNumber);t.targetMismatches.get(p)!==null?C=C.withResumeToken(ct.EMPTY_BYTE_STRING,q.min()).withLastLimboFreeSnapshotVersion(q.min()):m.resumeToken.approximateByteSize()>0&&(C=C.withResumeToken(m.resumeToken,r)),s=s.insert(p,C),(function(B,L,Q){return B.resumeToken.approximateByteSize()===0||L.snapshotVersion.toMicroseconds()-B.snapshotVersion.toMicroseconds()>=Ng?!0:Q.addedDocuments.size+Q.modifiedDocuments.size+Q.removedDocuments.size>0})(V,C,m)&&c.push(e.g_.updateTargetData(o,C))}));let h=Dt(),f=G();if(t.documentUpdates.forEach((m=>{t.resolvedLimboDocuments.has(m)&&c.push(e.persistence.referenceDelegate.updateLimboDocument(o,m))})),c.push(Ug(o,a,t.documentUpdates).next((m=>{h=m.jo,f=m.Ho}))),!r.isEqual(q.min())){const m=e.g_.getLastRemoteSnapshotVersion(o).next((p=>e.g_.setTargetsMetadata(o,o.currentSequenceNumber,r)));c.push(m)}return S.waitFor(c).next((()=>a.apply(o))).next((()=>e.localDocuments.getLocalViewOfDocuments(o,h,f))).next((()=>h))})).then((o=>(e.$o=s,o)))}function Ug(n,t,e){let r=G(),s=G();return e.forEach((o=>r=r.add(o))),t.getEntries(n,r).next((o=>{let a=Dt();return e.forEach(((c,h)=>{const f=o.get(c);h.isFoundDocument()!==f.isFoundDocument()&&(s=s.add(c)),h.isNoDocument()&&h.version.isEqual(q.min())?(t.removeEntry(c,h.readTime),a=a.insert(c,h)):!f.isValidDocument()||h.version.compareTo(f.version)>0||h.version.compareTo(f.version)===0&&f.hasPendingWrites?(t.addEntry(h),a=a.insert(c,h)):k(vo,"Ignoring outdated watch update for ",c,". Current version:",f.version," Watch version:",h.version)})),{jo:a,Ho:s}}))}function Fg(n,t){const e=j(n);return e.persistence.runTransaction("Get next mutation batch","readonly",(r=>(t===void 0&&(t=Qi),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t))))}function Bg(n,t){const e=j(n);return e.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return e.g_.getTargetData(r,t).next((o=>o?(s=o,S.resolve(s)):e.g_.allocateTargetId(r).next((a=>(s=new oe(t,a,"TargetPurposeListen",r.currentSequenceNumber),e.g_.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=e.$o.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.$o=e.$o.insert(r.targetId,r),e.Ko.set(t,r.targetId)),r}))}async function Li(n,t,e){const r=j(n),s=r.$o.get(t),o=e?"readwrite":"readwrite-primary";try{e||await r.persistence.runTransaction("Release target",o,(a=>r.persistence.referenceDelegate.removeTarget(a,s)))}catch(a){if(!vn(a))throw a;k(vo,`Failed to update sequence numbers for target ${t}: ${a}`)}r.$o=r.$o.remove(t),r.Ko.delete(s.target)}function vu(n,t,e){const r=j(n);let s=q.min(),o=G();return r.persistence.runTransaction("Execute query","readwrite",(a=>(function(h,f,m){const p=j(h),V=p.Ko.get(m);return V!==void 0?S.resolve(p.$o.get(V)):p.g_.getTargetData(f,m)})(r,a,mt(t)?t:Zt(t)).next((c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.g_.getMatchingKeysForTargetId(a,c.targetId).next((h=>{o=h}))})).next((()=>r.qo.getDocumentsMatchingQuery(a,t,e?s:q.min(),e?o:G()))).next((c=>($g(r,c),{documents:c,Jo:o})))))}function $g(n,t){t.forEach(((e,r)=>{const s=r.key.getCollectionGroup(),o=n.Wo.get(s)||q.min();r.readTime.compareTo(o)>0&&n.Wo.set(s,r.readTime)}))}class wu{constructor(){this.activeTargetIds=zd()}na(t){this.activeTargetIds=this.activeTargetIds.add(t)}ra(t){this.activeTargetIds=this.activeTargetIds.delete(t)}ta(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class qg{constructor(){this.Ua=new wu,this.ka={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,r){}addLocalQueryTarget(t,e=!0){return e&&this.Ua.na(t),this.ka[t]||"not-current"}updateQueryState(t,e,r){this.ka[t]=e}removeLocalQueryTarget(t){this.Ua.ra(t)}isLocalQueryTarget(t){return this.Ua.activeTargetIds.has(t)}clearQueryState(t){delete this.ka[t]}getAllActiveQueryTargets(){return this.Ua.activeTargetIds}isActiveQueryTarget(t){return this.Ua.activeTargetIds.has(t)}start(){return this.Ua=new wu,Promise.resolve()}handleUserChange(t,e,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}function Ei(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jg{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.qa=0,this.$a=null,this.Ka=!0}Wa(){this.qa===0&&(this.Qa("Unknown"),this.$a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.$a=null,this.Ga("Backend didn't respond within 10 seconds."),this.Qa("Offline"),Promise.resolve()))))}za(t){this.state==="Online"?this.Qa("Unknown"):(this.qa++,this.qa>=1&&(this.ja(),this.Ga(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.Qa("Offline")))}set(t){this.ja(),this.qa=0,t==="Online"&&(this.Ka=!1),this.Qa(t)}Qa(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}Ga(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Ka?(le(e),this.Ka=!1):k("OnlineStateTracker",e)}ja(){this.$a!==null&&(this.$a.cancel(),this.$a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const se="RemoteStore";class zg{constructor(t,e,r,s,o){this.localStore=t,this.datastore=e,this.asyncQueue=r,this.remoteSyncer={},this.Ha=[],this.Ja=new Map,this.Ya=new Map,this.Za=new Map,this.Xa=new xe(1e3),this.eu=new xe(1001),this.tu=new Set,this.nu=[],this.ru=o,this.ru.bt((a=>{r.enqueueAndForget((async()=>{Ze(this)&&(k(se,"Restarting streams for network reachability change."),await(async function(h){const f=j(h);f.tu.add(4),await Sr(f),f.iu.set("Unknown"),f.tu.delete(4),await $s(f)})(this))}))})),this.iu=new jg(r,s)}}async function $s(n){if(Ze(n))for(const t of n.nu)await t(!0)}async function Sr(n){for(const t of n.nu)await t(!1)}function Mi(n,t){return n.Ya.get(t)||void 0}function pl(n,t){const e=j(n),r=Mi(e,t.targetId);if(r!==void 0&&e.Ja.has(r))return;const s=(function(c,h){const f=Mi(c,h);f!==void 0&&c.Za.delete(f);const m=(function(V,C){return C%2!=0?V.eu.next():V.Xa.next()})(c,h);return c.Ya.set(h,m),c.Za.set(m,h),m})(e,t.targetId);k(se,"remoteStoreListen mapping SDK target ID to remote",t.targetId,s);const o=new oe(t.target,s,t.purpose,t.sequenceNumber,t.snapshotVersion,t.lastLimboFreeSnapshotVersion,t.resumeToken);e.Ja.set(s,o),Vo(e)?Ao(e):Rn(e).Fn()&&Io(e,o)}function wo(n,t){const e=j(n),r=Rn(e),s=Mi(e,t);k(se,"remoteStoreUnlisten removing mapping of SDK target ID to remote",t,s),e.Ja.delete(s),e.Ya.delete(t),e.Za.delete(s),r.Fn()&&gl(e,s),e.Ja.size===0&&(r.Fn()?r.Nn():Ze(e)&&e.iu.set("Unknown"))}function Io(n,t){if(n.su.We(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(q.min())>0){const e=n.Za.get(t.targetId);if(e===void 0)return void k(se,"SDK target ID not found for remote ID: "+t.targetId);const r=n.remoteSyncer.getRemoteKeysForTarget(e).size;t=t.withExpectedCount(r)}Rn(n).jn(t)}function gl(n,t){n.su.We(t),Rn(n).Hn(t)}function Ao(n){n.su=new Qd({getRemoteKeysForTarget:t=>{const e=n.Za.get(t);return e!==void 0?n.remoteSyncer.getRemoteKeysForTarget(e):G()},dt:t=>n.Ja.get(t)||null,Tt:()=>n.datastore.serializer.databaseId}),Rn(n).start(),n.iu.Wa()}function Vo(n){return Ze(n)&&!Rn(n).Cn()&&n.Ja.size>0}function Ze(n){return j(n).tu.size===0}function _l(n){n.su=void 0}async function Gg(n){n.iu.set("Online")}async function Hg(n){n.Ja.forEach(((t,e)=>{Io(n,t)}))}async function Qg(n,t){_l(n),Vo(n)?(n.iu.za(t),Ao(n)):n.iu.set("Unknown")}async function Kg(n,t,e){if(n.iu.set("Online"),t instanceof Sc&&t.state===2&&t.cause)try{await(async function(s,o){const a=o.cause;for(const c of o.targetIds){if(s.Ja.has(c)){const h=s.Za.get(c);h!==void 0&&(await s.remoteSyncer.rejectListen(h,a),s.Ya.delete(h),s.Za.delete(c)),s.Ja.delete(c)}s.su.removeTarget(c)}})(n,t)}catch(r){k(se,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await vs(n,r)}else if(t instanceof ts?n.su.et(t):t instanceof Pc?n.su.ot(t):n.su.rt(t),!e.isEqual(q.min()))try{const r=await ml(n.localStore);e.compareTo(r)>=0&&await(function(o,a){const c=o.su.Rt(a);c.targetChanges.forEach(((f,m)=>{if(f.resumeToken.approximateByteSize()>0){const p=o.Ja.get(m);p&&o.Ja.set(m,p.withResumeToken(f.resumeToken,a))}})),c.targetMismatches.forEach(((f,m)=>{const p=o.Ja.get(f);if(!p)return;o.Ja.set(f,p.withResumeToken(ct.EMPTY_BYTE_STRING,p.snapshotVersion)),gl(o,f);const V=new oe(p.target,f,m,p.sequenceNumber);Io(o,V)}));const h=(function(m,p){const V=new Map;p.targetChanges.forEach(((x,B)=>{const L=m.Za.get(B);L!==void 0&&V.set(L,x)}));let C=new et(H);return p.targetMismatches.forEach(((x,B)=>{const L=m.Za.get(x);L!==void 0&&(C=C.insert(L,B))})),new Ar(p.snapshotVersion,V,C,p.documentUpdates,p.augmentedDocumentUpdates,p.resolvedLimboDocuments)})(o,c);return o.remoteSyncer.applyRemoteEvent(h)})(n,e)}catch(r){k(se,"Failed to raise snapshot:",r),await vs(n,r)}}async function vs(n,t,e){if(!vn(t))throw t;n.tu.add(1),await Sr(n),n.iu.set("Offline"),e||(e=()=>ml(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{k(se,"Retrying IndexedDB access"),await e(),n.tu.delete(1),await $s(n)}))}function yl(n,t){return t().catch((e=>vs(n,e,t)))}async function qs(n){const t=j(n),e=De(t);let r=t.Ha.length>0?t.Ha[t.Ha.length-1].batchId:Qi;for(;Wg(t);)try{const s=await Fg(t.localStore,r);if(s===null){t.Ha.length===0&&e.Nn();break}r=s.batchId,Yg(t,s)}catch(s){await vs(t,s)}El(t)&&Tl(t)}function Wg(n){return Ze(n)&&n.Ha.length<10}function Yg(n,t){n.Ha.push(t);const e=De(n);e.Fn()&&e.Jn&&e.Yn(t.mutations)}function El(n){return Ze(n)&&!De(n).Cn()&&n.Ha.length>0}function Tl(n){De(n).start()}async function Jg(n){De(n).er()}async function Xg(n){const t=De(n);for(const e of n.Ha)t.Yn(e.mutations)}async function Zg(n,t,e){const r=n.Ha.shift(),s=_o.from(r,t,e);await yl(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await qs(n)}async function t_(n,t){t&&De(n).Jn&&await(async function(r,s){if((function(a){return Fd(a)&&a!==b.ABORTED})(s.code)){const o=r.Ha.shift();De(r).Mn(),await yl(r,(()=>r.remoteSyncer.rejectFailedWrite(o.batchId,s))),await qs(r)}})(n,t),El(n)&&Tl(n)}async function Iu(n,t){const e=j(n);e.asyncQueue.verifyOperationInProgress(),k(se,"RemoteStore received new credentials");const r=Ze(e);e.tu.add(3),await Sr(e),r&&e.iu.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.tu.delete(3),await $s(e)}async function e_(n,t){const e=j(n);t?(e.tu.delete(2),await $s(e)):t||(e.tu.add(2),await Sr(e),e.iu.set("Unknown"))}function Rn(n){return n._u||(n._u=(function(e,r,s){const o=j(e);return o.nr(),new _m(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)})(n.datastore,n.asyncQueue,{Qt:Gg.bind(null,n),zt:Hg.bind(null,n),Ht:Qg.bind(null,n),zn:Kg.bind(null,n)}),n.nu.push((async t=>{t?(n._u.Mn(),Vo(n)?Ao(n):n.iu.set("Unknown")):(await n._u.stop(),_l(n))}))),n._u}function De(n){return n.ou||(n.ou=(function(e,r,s){const o=j(e);return o.nr(),new ym(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)})(n.datastore,n.asyncQueue,{Qt:()=>Promise.resolve(),zt:Jg.bind(null,n),Ht:t_.bind(null,n),Zn:Xg.bind(null,n),Xn:Zg.bind(null,n)}),n.nu.push((async t=>{t?(n.ou.Mn(),await qs(n)):(await n.ou.stop(),n.Ha.length>0&&(k(se,`Stopping write stream with ${n.Ha.length} pending writes`),n.Ha=[]))}))),n.ou}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ro{constructor(t,e,r,s,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=s,this.removalCallback=o,this.deferred=new ve,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,s,o){const a=Date.now()+r,c=new Ro(t,e,a,s,o);return c.start(r),c}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new O(b.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Po(n,t){if(le("AsyncQueue",`${t}: ${n}`),vn(n))return new O(b.UNAVAILABLE,`${t}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ze{static emptySet(t){return new ze(t.comparator)}constructor(t){this.comparator=t?(e,r)=>t(e,r)||U.comparator(e.key,r.key):(e,r)=>U.comparator(e.key,r.key),this.keyedMap=sn(),this.sortedSet=new et(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal(((e,r)=>(t(e),!1)))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof ze)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(!s.isEqual(o))return!1}return!0}toString(){const t=[];return this.forEach((e=>{t.push(e.toString())})),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const r=new ze;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=e,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Au{constructor(){this.au=new et(U.comparator)}track(t){const e=t.doc.key,r=this.au.get(e);r?t.type!==0&&r.type===3?this.au=this.au.insert(e,t):t.type===3&&r.type!==1?this.au=this.au.insert(e,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.au=this.au.insert(e,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.au=this.au.insert(e,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.au=this.au.remove(e):t.type===1&&r.type===2?this.au=this.au.insert(e,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.au=this.au.insert(e,{type:2,doc:t.doc}):F(63341,{ft:t,uu:r}):this.au=this.au.insert(e,t)}cu(){const t=[];return this.au.inorderTraversal(((e,r)=>{t.push(r)})),t}}class gn{constructor(t,e,r,s,o,a,c,h,f){this.query=t,this.docs=e,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=o,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=h,this.hasCachedResults=f}static fromInitialDocuments(t,e,r,s,o){const a=[];return e.forEach((c=>{a.push({type:0,doc:c})})),new gn(t,e,ze.emptySet(e),a,r,s,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&Fs(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,r=t.docChanges;if(e.length!==r.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==r[s].type||!e[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n_{constructor(){this.lu=void 0,this.Eu=[]}hu(){return this.Eu.some((t=>t.Tu()))}}class r_{constructor(){this.queries=Vu(),this.onlineState="Unknown",this.Pu=new Set}terminate(){(function(e,r){const s=j(e),o=s.queries;s.queries=Vu(),o.forEach(((a,c)=>{for(const h of c.Eu)h.onError(r)}))})(this,new O(b.ABORTED,"Firestore shutting down"))}}function Vu(){return new Je((n=>ul(n)),Fs)}async function vl(n,t){const e=j(n);let r=3;const s=t.query;let o=e.queries.get(s);o?!o.hu()&&t.Tu()&&(r=2):(o=new n_,r=t.Tu()?0:1);try{switch(r){case 0:o.lu=await e.onListen(s,!0);break;case 1:o.lu=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(a){const c=Po(a,`Initialization of query '${mt(t.query)?ue(t.query):Xn(t.query)}' failed`);return void t.onError(c)}e.queries.set(s,o),o.Eu.push(t),t.Ru(e.onlineState),o.lu&&t.Iu(o.lu)&&So(e)}async function wl(n,t){const e=j(n),r=t.query;let s=3;const o=e.queries.get(r);if(o){const a=o.Eu.indexOf(t);a>=0&&(o.Eu.splice(a,1),o.Eu.length===0?s=t.Tu()?0:1:!o.hu()&&t.Tu()&&(s=2))}switch(s){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function s_(n,t){const e=j(n);let r=!1;for(const s of t){const o=s.query,a=e.queries.get(o);if(a){for(const c of a.Eu)c.Iu(s)&&(r=!0);a.lu=s}}r&&So(e)}function i_(n,t,e){const r=j(n),s=r.queries.get(t);if(s)for(const o of s.Eu)o.onError(e);r.queries.delete(t)}function So(n){n.Pu.forEach((t=>{t.next()}))}var Ui;(function(n){n.Default="default",n.Cache="cache"})(Ui||(Ui={}));class Il{constructor(t,e,r){this.query=t,this.Au=e,this.Vu=!1,this.du=null,this.onlineState="Unknown",this.options=r||{}}Iu(t){if(!this.options.includeMetadataChanges){const r=[];for(const s of t.docChanges)s.type!==3&&r.push(s);t=new gn(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.Vu?this.fu(t)&&(this.Au.next(t),e=!0):this.mu(t,this.onlineState)&&(this.pu(t),e=!0),this.du=t,e}onError(t){this.Au.error(t)}Ru(t){this.onlineState=t;let e=!1;return this.du&&!this.Vu&&this.mu(this.du,t)&&(this.pu(this.du),e=!0),e}mu(t,e){if(!t.fromCache||!this.Tu())return!0;const r=e!=="Offline";return(!this.options.waitForSyncWhenOnline||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}fu(t){if(t.docChanges.length>0)return!0;const e=this.du&&this.du.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}pu(t){t=gn.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.Vu=!0,this.Au.next(t)}Tu(){return this.options.source!==Ui.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Al{constructor(t){this.key=t}}class Vl{constructor(t){this.key=t}}class o_{constructor(t,e){this.query=t,this.Ou=e,this.Mu=null,this.hasCachedResults=!1,this.current=!1,this.Nu=G(),this.mutatedKeys=G(),this.Lu=mt(t)?Oi(t):Zi(t),this.Bu=new ze(this.Lu)}get Uu(){return this.Ou}ku(t,e){const r=e?e.qu:new Au,s=e?e.Bu:this.Bu;let o=e?e.mutatedKeys:this.mutatedKeys,a=s,c=!1;const[h,f]=this.$u(this.query,s);t.inorderTraversal(((p,V)=>{const C=s.get(p),x=_g(this.query,V)?V:null,B=!!C&&this.mutatedKeys.has(C.key),L=!!x&&(x.hasLocalMutations||this.mutatedKeys.has(x.key)&&x.hasCommittedMutations);let Q=!1;C&&x?C.data.isEqual(x.data)?B!==L&&(r.track({type:3,doc:x}),Q=!0):this.Ku(C,x)||(r.track({type:2,doc:x}),Q=!0,(h&&this.Lu(x,h)>0||f&&this.Lu(x,f)<0)&&(c=!0)):!C&&x?(r.track({type:0,doc:x}),Q=!0):C&&!x&&(r.track({type:1,doc:C}),Q=!0,(h||f)&&(c=!0)),Q&&(x?(a=a.add(x),o=L?o.add(p):o.delete(p)):(a=a.delete(p),o=o.delete(p)))}));const m=this.Wu(this.query);if(m)if(mt(this.query)){const p=[];a.forEach((x=>p.push(x)));const V=hl(this.query,p);let C=new ze(Oi(this.query));for(const x of V)C=C.add(x);a.forEach((x=>{C.has(x.key)||(o=o.delete(x.key),r.track({type:1,doc:x}))})),a=C}else{const p=this.Qu(this.query);for(;a.size>m;){const V=p==="F"?a.last():a.first();a=a.delete(V.key),o=o.delete(V.key),r.track({type:1,doc:V})}}return{Bu:a,qu:r,Uo:c,mutatedKeys:o}}Wu(t){var e;return mt(t)?(e=yi(t))==null?void 0:e.limit:t.limit||void 0}Qu(t){if(mt(t)){const e=yi(t);return e&&e.limit<0?"L":"F"}return t.limitType}$u(t,e){var r;if(mt(t)){const s=(r=yi(t))==null?void 0:r.limit;return[e.size===s?e.last():null,null]}return[t.limitType==="F"&&e.size===this.Wu(this.query)?e.last():null,t.limitType==="L"&&e.size===this.Wu(this.query)?e.first():null]}Ku(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,r,s){const o=this.Bu;this.Bu=t.Bu,this.mutatedKeys=t.mutatedKeys;const a=t.qu.cu();a.sort(((m,p)=>(function(C,x){const B=L=>{switch(L){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return F(20277,{ft:L})}};return B(C)-B(x)})(m.type,p.type)||this.Lu(m.doc,p.doc))),this.Gu(r),s=s??!1;const c=e&&!s?this.zu():[],h=this.Nu.size===0&&this.current&&!s?1:0,f=h!==this.Mu;return this.Mu=h,a.length!==0||f?{snapshot:new gn(this.query,t.Bu,o,a,t.mutatedKeys,h===0,f,!1,!!r&&r.resumeToken.approximateByteSize()>0),ju:c}:{ju:c}}Ru(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({Bu:this.Bu,qu:new Au,mutatedKeys:this.mutatedKeys,Uo:!1},!1)):{ju:[]}}Hu(t){return!this.Ou.has(t)&&!!this.Bu.has(t)&&!this.Bu.get(t).hasLocalMutations}Gu(t){t&&(t.addedDocuments.forEach((e=>this.Ou=this.Ou.add(e))),t.modifiedDocuments.forEach((e=>{})),t.removedDocuments.forEach((e=>this.Ou=this.Ou.delete(e))),this.current=t.current)}zu(){if(!this.current)return[];const t=this.Nu;this.Nu=G(),this.Bu.forEach((r=>{this.Hu(r.key)&&(this.Nu=this.Nu.add(r.key))}));const e=[];return t.forEach((r=>{this.Nu.has(r)||e.push(new Vl(r))})),this.Nu.forEach((r=>{t.has(r)||e.push(new Al(r))})),e}Ju(t){this.Ou=t.Jo,this.Nu=G();const e=this.ku(t.documents);return this.applyChanges(e,!0)}Yu(){return gn.fromInitialDocuments(this.query,this.Bu,this.mutatedKeys,this.Mu===0,this.hasCachedResults)}}const Co="SyncEngine";class a_{constructor(t,e,r){this.query=t,this.targetId=e,this.view=r}}class u_{constructor(t){this.key=t,this.Zu=!1}}class c_{constructor(t,e,r,s,o,a){this.localStore=t,this.remoteStore=e,this.eventManager=r,this.sharedClientState=s,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.Xu={},this.ec=new Je((c=>ul(c)),Fs),this.tc=new Map,this.nc=new Set,this.rc=new et(U.comparator),this.sc=new Map,this._c=new yo,this.oc={},this.ac=new Map,this.uc=xe.Cs(),this.onlineState="Unknown",this.cc=void 0}get isPrimaryClient(){return this.cc===!0}}async function l_(n,t,e=!0){const r=xl(n);let s;const o=r.ec.get(t);return o?(r.sharedClientState.addLocalQueryTarget(o.targetId),s=o.view.Yu()):s=await Rl(r,t,e,!0),s}async function h_(n,t){const e=xl(n);await Rl(e,t,!0,!1)}async function Rl(n,t,e,r){const s=await Bg(n.localStore,mt(t)?t:Zt(t)),o=s.targetId,a=n.sharedClientState.addLocalQueryTarget(o,e);let c;return r&&(c=await f_(n,t,o,a==="current",s.resumeToken)),n.isPrimaryClient&&e&&pl(n.remoteStore,s),c}async function f_(n,t,e,r,s){n.lc=(p,V,C)=>(async function(B,L,Q,J){let rt=L.view.ku(Q);rt.Uo&&(rt=await vu(B.localStore,L.query,!1).then((({documents:v})=>L.view.ku(v,rt))));const qt=J&&J.targetChanges.get(L.targetId),Tt=J&&J.targetMismatches.get(L.targetId)!=null,vt=L.view.applyChanges(rt,B.isPrimaryClient,qt,Tt);return Pu(B,L.targetId,vt.ju),vt.snapshot})(n,p,V,C);const o=await vu(n.localStore,t,!0),a=new o_(t,o.Jo),c=a.ku(o.documents),h=Vr.createSynthesizedTargetChangeForCurrentChange(e,r&&n.onlineState!=="Offline",s),f=a.applyChanges(c,n.isPrimaryClient,h);Pu(n,e,f.ju);const m=new a_(t,e,a);return n.ec.set(t,m),n.tc.has(e)?n.tc.get(e).push(t):n.tc.set(e,[t]),f.snapshot}async function d_(n,t,e){const r=j(n),s=r.ec.get(t),o=r.tc.get(s.targetId);if(o.length>1)return r.tc.set(s.targetId,o.filter((a=>!Fs(a,t)))),void r.ec.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Li(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),e&&wo(r.remoteStore,s.targetId),Fi(r,s.targetId)})).catch(Tn)):(Fi(r,s.targetId),await Li(r.localStore,s.targetId,!0))}async function m_(n,t){const e=j(n),r=e.ec.get(t),s=e.tc.get(r.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),wo(e.remoteStore,r.targetId))}async function p_(n,t,e){const r=w_(n);try{const s=await(function(a,c){const h=j(a),f=tt.now(),m=c.reduce(((C,x)=>C.add(x.key)),G());let p,V;return h.persistence.runTransaction("Locally write mutations","readwrite",(C=>{let x=Dt(),B=G();return h.Qo.getEntries(C,m).next((L=>{x=L,x.forEach(((Q,J)=>{J.isValidDocument()||(B=B.add(Q))}))})).next((()=>h.localDocuments.getOverlayedDocuments(C,x))).next((L=>{p=L;const Q=[];for(const J of c){const rt=Td(J,p.get(J.key).overlayedDocument);rt!=null&&Q.push(new Ye(J.key,rt,ac(rt.value.mapValue),Xt.exists(!0)))}return h.mutationQueue.addMutationBatch(C,f,Q,c)})).next((L=>{V=L;const Q=L.applyToLocalDocumentSet(p,B);return h.documentOverlayCache.saveOverlays(C,L.batchId,Q)}))})).then((()=>({batchId:V.batchId,changes:Vc(p)})))})(r.localStore,t);r.sharedClientState.addPendingMutation(s.batchId),(function(a,c,h){let f=a.oc[a.currentUser.toKey()];f||(f=new et(H)),f=f.insert(c,h),a.oc[a.currentUser.toKey()]=f})(r,s.batchId,e),await Cr(r,s.changes),await qs(r.remoteStore)}catch(s){const o=Po(s,"Failed to persist write");e.reject(o)}}async function Pl(n,t){const e=j(n);try{const r=await Mg(e.localStore,t);t.targetChanges.forEach(((s,o)=>{const a=e.sc.get(o);a&&(M(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.Zu=!0:s.modifiedDocuments.size>0?M(a.Zu,14607):s.removedDocuments.size>0&&(M(a.Zu,42227),a.Zu=!1))})),await Cr(e,r,t)}catch(r){await Tn(r)}}function Ru(n,t,e){const r=j(n);if(r.isPrimaryClient&&e===0||!r.isPrimaryClient&&e===1){const s=[];r.ec.forEach(((o,a)=>{const c=a.view.Ru(t);c.snapshot&&s.push(c.snapshot)})),(function(a,c){const h=j(a);h.onlineState=c;let f=!1;h.queries.forEach(((m,p)=>{for(const V of p.Eu)V.Ru(c)&&(f=!0)})),f&&So(h)})(r.eventManager,t),s.length&&r.Xu.zn(s),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function g_(n,t,e){const r=j(n);r.sharedClientState.updateQueryState(t,"rejected",e);const s=r.sc.get(t),o=s&&s.key;if(o){let a=new et(U.comparator);a=a.insert(o,Vt.newNoDocument(o,q.min()));const c=G().add(o),h=new Ar(q.min(),new Map,new et(H),a,Dt(),c);await Pl(r,h),r.rc=r.rc.remove(o),r.sc.delete(t),bo(r)}else await Li(r.localStore,t,!1).then((()=>Fi(r,t,e))).catch(Tn)}async function __(n,t){const e=j(n),r=t.batch.batchId;try{const s=await Lg(e.localStore,t);Cl(e,r,null),Sl(e,r),e.sharedClientState.updateMutationState(r,"acknowledged"),await Cr(e,s)}catch(s){await Tn(s)}}async function y_(n,t,e){const r=j(n);try{const s=await(function(a,c){const h=j(a);return h.persistence.runTransaction("Reject batch","readwrite-primary",(f=>{let m;return h.mutationQueue.lookupMutationBatch(f,c).next((p=>(M(p!==null,37113),m=p.keys(),h.mutationQueue.removeMutationBatch(f,p)))).next((()=>h.mutationQueue.performConsistencyCheck(f))).next((()=>h.documentOverlayCache.removeOverlaysForBatchId(f,m,c))).next((()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f,m))).next((()=>h.localDocuments.getDocuments(f,m)))}))})(r.localStore,t);Cl(r,t,e),Sl(r,t),r.sharedClientState.updateMutationState(t,"rejected",e),await Cr(r,s)}catch(s){await Tn(s)}}function Sl(n,t){(n.ac.get(t)||[]).forEach((e=>{e.resolve()})),n.ac.delete(t)}function Cl(n,t,e){const r=j(n);let s=r.oc[r.currentUser.toKey()];if(s){const o=s.get(t);o&&(e?o.reject(e):o.resolve(),s=s.remove(t)),r.oc[r.currentUser.toKey()]=s}}function Fi(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(const r of n.tc.get(t))n.ec.delete(r),e&&n.Xu.Ec(r,e);n.tc.delete(t),n.isPrimaryClient&&n._c.s_(t).forEach((r=>{n._c.containsKey(r)||bl(n,r)}))}function bl(n,t){n.nc.delete(t.path.canonicalString());const e=n.rc.get(t);e!==null&&(wo(n.remoteStore,e),n.rc=n.rc.remove(t),n.sc.delete(e),bo(n))}function Pu(n,t,e){for(const r of e)r instanceof Al?(n._c.addReference(r.key,t),E_(n,r)):r instanceof Vl?(k(Co,"Document no longer in limbo: "+r.key),n._c.removeReference(r.key,t),n._c.containsKey(r.key)||bl(n,r.key)):F(19791,{hc:r})}function E_(n,t){const e=t.key,r=e.path.canonicalString();n.rc.get(e)||n.nc.has(r)||(k(Co,"New document in limbo: "+e),n.nc.add(r),bo(n))}function bo(n){for(;n.nc.size>0&&n.rc.size<n.maxConcurrentLimboResolutions;){const t=n.nc.values().next().value;n.nc.delete(t);const e=new U(Y.fromString(t)),r=n.uc.next();n.sc.set(r,new u_(e)),n.rc=n.rc.insert(e,r),pl(n.remoteStore,new oe(Zt(Xi(e.path)),r,"TargetPurposeLimboResolution",Is.ce))}}async function Cr(n,t,e){const r=j(n),s=[],o=[],a=[];r.ec.isEmpty()||(r.ec.forEach(((c,h)=>{a.push(r.lc(h,t,e).then((f=>{var m;if((f||e)&&r.isPrimaryClient){const p=f?!f.fromCache:(m=e==null?void 0:e.targetChanges.get(h.targetId))==null?void 0:m.current;r.sharedClientState.updateQueryState(h.targetId,p?"current":"not-current")}if(f){s.push(f);const p=To.vo(h.targetId,f);o.push(p)}})))})),await Promise.all(a),r.Xu.zn(s),await(async function(h,f){const m=j(h);try{await m.persistence.runTransaction("notifyLocalViewChanges","readwrite",(p=>S.forEach(f,(V=>S.forEach(V.wo,(C=>m.persistence.referenceDelegate.addReference(p,V.targetId,C))).next((()=>S.forEach(V.bo,(C=>m.persistence.referenceDelegate.removeReference(p,V.targetId,C)))))))))}catch(p){if(!vn(p))throw p;k(vo,"Failed to update sequence numbers: "+p)}for(const p of f){const V=p.targetId;if(!p.fromCache){const C=m.$o.get(V),x=C.snapshotVersion,B=C.withLastLimboFreeSnapshotVersion(x);m.$o=m.$o.insert(V,B)}}})(r.localStore,o))}async function T_(n,t){const e=j(n);if(!e.currentUser.isEqual(t)){k(Co,"User change. New user:",t.toKey());const r=await dl(e.localStore,t);e.currentUser=t,(function(o,a){o.ac.forEach((c=>{c.forEach((h=>{h.reject(new O(b.CANCELLED,a))}))})),o.ac.clear()})(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await Cr(e,r.zo)}}function v_(n,t){const e=j(n),r=e.sc.get(t);if(r&&r.Zu)return G().add(r.key);{let s=G();const o=e.tc.get(t);if(!o)return s;for(const a of o??[]){const c=e.ec.get(a);s=s.unionWith(c.view.Uu)}return s}}function xl(n){const t=j(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=Pl.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=v_.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=g_.bind(null,t),t.Xu.zn=s_.bind(null,t.eventManager),t.Xu.Ec=i_.bind(null,t.eventManager),t}function w_(n){const t=j(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=__.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=y_.bind(null,t),t}class ws{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=xs(t.databaseInfo.databaseId),this.sharedClientState=this.Rc(t),this.persistence=this.Ic(t),await this.persistence.start(),this.localStore=this.Ac(t),this.gcScheduler=this.Vc(t,this.localStore),this.indexBackfillerScheduler=this.dc(t,this.localStore)}Vc(t,e){return null}dc(t,e){return null}Ac(t){return Og(this.persistence,new Dg,t.initialUser,this.serializer)}Ic(t){return new fl(Eo.C_,this.serializer)}Rc(t){return new qg}async terminate(){var t,e;(t=this.gcScheduler)==null||t.stop(),(e=this.indexBackfillerScheduler)==null||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}ws.provider={build:()=>new ws};class I_ extends ws{constructor(t){super(),this.cacheSizeBytes=t}Vc(t,e){M(this.persistence.referenceDelegate instanceof Ts,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new Rm(r,t.asyncQueue,e)}Ic(t){const e=this.cacheSizeBytes!==void 0?xt.withCacheSize(this.cacheSizeBytes):xt.DEFAULT;return new fl((r=>Ts.C_(r,e)),this.serializer)}}class Bi{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Ru(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=T_.bind(null,this.syncEngine),await e_(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return(function(){return new r_})()}createDatastore(t){const e=xs(t.databaseInfo.databaseId),r=gm(t.databaseInfo);return vm(t.authCredentials,t.appCheckCredentials,r,e)}createRemoteStore(t){return(function(r,s,o,a,c){return new zg(r,s,o,a,c)})(this.localStore,this.datastore,t.asyncQueue,(e=>Ru(this.syncEngine,e,0)),(function(){return hu.C()?new hu:new fm})())}createSyncEngine(t,e){return(function(s,o,a,c,h,f,m){const p=new c_(s,o,a,c,h,f);return m&&(p.cc=!0),p})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await(async function(s){const o=j(s);k(se,"RemoteStore shutting down."),o.tu.add(5),await Sr(o),o.ru.shutdown(),o.iu.set("Unknown")})(this.remoteStore),(t=this.datastore)==null||t.terminate(),(e=this.eventManager)==null||e.terminate()}}Bi.provider={build:()=>new Bi};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dl{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.mc(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.mc(this.observer.error,t):le("Uncaught Error in snapshot listener:",t.toString()))}gc(){this.muted=!0}mc(t,e){setTimeout((()=>{this.muted||t(e)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ne="FirestoreClient";class A_{constructor(t,e,r,s,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=r,this._databaseInfo=s,this.user=At.UNAUTHENTICATED,this.clientId=Gi.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,(async a=>{k(Ne,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(r,(a=>(k(Ne,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new ve;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const r=Po(e,"Failed to shutdown persistence");t.reject(r)}})),t.promise}}async function Ti(n,t){n.asyncQueue.verifyOperationInProgress(),k(Ne,"Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let r=e.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await dl(t.localStore,s),r=s)})),t.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=t}async function Su(n,t){n.asyncQueue.verifyOperationInProgress();const e=await V_(n);k(Ne,"Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener((r=>Iu(t.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>Iu(t.remoteStore,s))),n._onlineComponents=t}async function V_(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){k(Ne,"Using user provided OfflineComponentProvider");try{await Ti(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!(function(s){return s.name==="FirebaseError"?s.code===b.FAILED_PRECONDITION||s.code===b.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(e))throw e;Ht("Error using user provided cache. Falling back to memory cache: "+e),await Ti(n,new ws)}}else k(Ne,"Using default OfflineComponentProvider"),await Ti(n,new I_(void 0));return n._offlineComponents}async function Nl(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(k(Ne,"Using user provided OnlineComponentProvider"),await Su(n,n._uninitializedComponentsProvider._online)):(k(Ne,"Using default OnlineComponentProvider"),await Su(n,new Bi))),n._onlineComponents}function R_(n){return Nl(n).then((t=>t.syncEngine))}async function $i(n){const t=await Nl(n),e=t.eventManager;return e.onListen=l_.bind(null,t.syncEngine),e.onUnlisten=d_.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=h_.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=m_.bind(null,t.syncEngine),e}function P_(n,t,e,r){const s=new Dl(r),o=new Il(t,s,e);return n.asyncQueue.enqueueAndForget((async()=>vl(await $i(n),o))),()=>{s.gc(),n.asyncQueue.enqueueAndForget((async()=>wl(await $i(n),o)))}}function S_(n,t,e={}){const r=new ve;return n.asyncQueue.enqueueAndForget((async()=>(function(o,a,c,h,f){const m=new Dl({next:V=>{m.gc(),a.enqueueAndForget((()=>wl(o,p))),V.fromCache&&h.source==="server"?f.reject(new O(b.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):f.resolve(V)},error:V=>f.reject(V)}),p=new Il(c instanceof tr?lg(c):c,m,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return vl(o,p)})(await $i(n),n.asyncQueue,t,e,r))),r.promise}function C_(n,t){const e=new ve;return n.asyncQueue.enqueueAndForget((async()=>p_(await R_(n),t,e))),e.promise}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cu="AsyncQueue";class bu{constructor(t=Promise.resolve()){this.qc=[],this.$c=!1,this.Kc=[],this.Wc=null,this.Qc=!1,this.Gc=!1,this.zc=[],this.xn=new Bc(this,"async_queue_retry"),this.jc=()=>{const r=Ei();r&&k(Cu,"Visibility state changed to "+r.visibilityState),this.xn.gn()},this.Hc=t;const e=Ei();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.jc)}get isShuttingDown(){return this.$c}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.Jc(),this.Yc(t)}enterRestrictedMode(t){if(!this.$c){this.$c=!0,this.Gc=t||!1;const e=Ei();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.jc)}}enqueue(t){if(this.Jc(),this.$c)return new Promise((()=>{}));const e=new ve;return this.Yc((()=>this.$c&&this.Gc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise))).then((()=>e.promise))}enqueueRetryable(t){this.enqueueAndForget((()=>(this.qc.push(t),this.Zc())))}async Zc(){if(this.qc.length!==0){try{await this.qc[0](),this.qc.shift(),this.xn.reset()}catch(t){if(!vn(t))throw t;k(Cu,"Operation failed with retryable error: "+t)}this.qc.length>0&&this.xn.mn((()=>this.Zc()))}}Yc(t){const e=this.Hc.then((()=>(this.Qc=!0,t().catch((r=>{throw this.Wc=r,this.Qc=!1,le("INTERNAL UNHANDLED ERROR: ",xu(r)),r})).then((r=>(this.Qc=!1,r))))));return this.Hc=e,e}enqueueAfterDelay(t,e,r){this.Jc(),this.zc.indexOf(t)>-1&&(e=0);const s=Ro.createAndSchedule(this,t,e,r,(o=>this.Xc(o)));return this.Kc.push(s),s}Jc(){this.Wc&&F(47125,{el:xu(this.Wc)})}verifyOperationInProgress(){}async tl(){let t;do t=this.Hc,await t;while(t!==this.Hc)}nl(t){for(const e of this.Kc)if(e.timerId===t)return!0;return!1}rl(t){return this.tl().then((()=>{this.Kc.sort(((e,r)=>e.targetTimeMs-r.targetTimeMs));for(const e of this.Kc)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.tl()}))}il(t){this.zc.push(t)}Xc(t){const e=this.Kc.indexOf(t);this.Kc.splice(e,1)}}function xu(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),t}class _n extends Ds{constructor(t,e,r,s){super(t,e,r,s),this.type="firestore",this._queue=new bu,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new bu(t),this._firestoreClient=void 0,await t}}}function j_(n,t){const e=typeof n=="object"?n:bf(),r=typeof n=="string"?n:us,s=Af(e,"firestore").getImmediate({identifier:r});if(!s._initialized){const o=Rh("firestore");o&&Cm(s,...o)}return s}function xo(n){if(n._terminated)throw new O(b.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||b_(n),n._firestoreClient}function b_(n){var r,s,o,a;const t=n._freezeSettings(),e=Im(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,(s=n._app)==null?void 0:s.options.apiKey,t);n._componentsProvider||(o=t.localCache)!=null&&o._offlineComponentProvider&&((a=t.localCache)!=null&&a._onlineComponentProvider)&&(n._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),n._firestoreClient=new A_(n._authCredentials,n._appCheckCredentials,n._queue,e,n._componentsProvider&&(function(h){const f=h==null?void 0:h._online.build();return{_offline:h==null?void 0:h._offline.build(f),_online:f}})(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x_{convertValue(t,e="none"){switch(lt(t)){case 0:return null;case 1:return t.booleanValue;case 2:return nt(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(Pe(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw F(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const r={};return We(t,((s,o)=>{r[s]=this.convertValue(o,e)})),r}convertVectorValue(t){var r,s,o;const e=(o=(s=(r=t.fields)==null?void 0:r[ur].arrayValue)==null?void 0:s.values)==null?void 0:o.map((a=>nt(a.doubleValue)));return new Nt(e)}convertGeoPoint(t){return new ee(nt(t.latitude),nt(t.longitude))}convertArray(t,e){return(t.values||[]).map((r=>this.convertValue(r,e)))}convertServerTimestamp(t,e){switch(e){case"previous":const r=wr(t);return r==null?null:this.convertValue(r,e);case"estimate":return this.convertTimestamp(fn(t));default:return null}}convertTimestamp(t){const e=Re(t);return new tt(e.seconds,e.nanos)}convertDocumentKey(t,e){const r=Y.fromString(t);M(Oc(r),9688,{name:t});const s=new ar(r.get(1),r.get(3)),o=new U(r.popFirst(5));return s.isEqual(e)||le(`Document ${o} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),o}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Do extends x_{constructor(t){super(),this.firestore=t}convertBytes(t){return new jt(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new at(this.firestore,null,e)}}const Du="@firebase/firestore",Nu="4.16.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ku(n){return(function(e,r){if(typeof e!="object"||e===null)return!1;const s=e;for(const o of r)if(o in s&&typeof s[o]=="function")return!0;return!1})(n,["next","error","complete"])}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kl{constructor(t,e,r,s,o){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=s,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new at(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new D_(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var t;return((t=this._document)==null?void 0:t.data.clone().value.mapValue.fields)??void 0}get(t){if(this._document){const e=this._document.data.field(Ns("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class D_ extends kl{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ol(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new O(b.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}function N_(n,t,e){let r;return r=n?n.toFirestore(t):t,r}class Kn{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Ge extends kl{constructor(t,e,r,s,o,a){super(t,e,r,s,a),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new rs(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const r=this._document.data.field(Ns("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new O(b.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=Ge._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}Ge._jsonSchemaVersion="firestore/documentSnapshot/1.0",Ge._jsonSchema={type:ot("string",Ge._jsonSchemaVersion),bundleSource:ot("string","DocumentSnapshot"),bundleName:ot("string"),bundle:ot("string")};class rs extends Ge{data(t={}){return super.data(t)}}class He{constructor(t,e,r,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new Kn(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const t=[];return this.forEach((e=>t.push(e))),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach((r=>{t.call(e,new rs(this._firestore,this._userDataWriter,r.key,r,new Kn(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new O(b.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=(function(s,o){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map((c=>{mt(s._snapshot.query)?Oi(s._snapshot.query):Zi(s.query._query);const h=new rs(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Kn(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:h,oldIndex:-1,newIndex:a++}}))}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((c=>o||c.type!==3)).map((c=>{const h=new rs(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Kn(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let f=-1,m=-1;return c.type!==0&&(f=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),m=a.indexOf(c.doc.key)),{type:k_(c.type),doc:h,oldIndex:f,newIndex:m}}))}})(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new O(b.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=He._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=Gi.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],r=[],s=[];return this.docs.forEach((o=>{o._document!==null&&(e.push(o._document),r.push(this._userDataWriter.convertObjectMap(o._document.data.value.mapValue.fields,"previous")),s.push(o.ref.path))})),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function k_(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return F(61501,{type:n})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */He._jsonSchemaVersion="firestore/querySnapshot/1.0",He._jsonSchema={type:ot("string",He._jsonSchemaVersion),bundleSource:ot("string","QuerySnapshot"),bundleName:ot("string"),bundle:ot("string")};function z_(n){n=ae(n,Rr);const t=ae(n.firestore,_n),e=xo(t),r=new Do(t);return Ol(n._query),S_(e,n._query).then((s=>new He(t,r,n,s)))}function G_(n,t,e){n=ae(n,at);const r=ae(n.firestore,_n),s=N_(n.converter,t),o=Nm(r);return Ll(r,[km(o,"setDoc",n._key,s,n.converter!==null,e).toMutation(n._key,Xt.none())])}function H_(n){return Ll(ae(n.firestore,_n),[new Ji(n._key,Xt.none())])}function Q_(n,...t){var f,m,p;n=ln(n);let e={includeMetadataChanges:!1,source:"default"},r=0;typeof t[r]!="object"||ku(t[r])||(e=t[r++]);const s={includeMetadataChanges:e.includeMetadataChanges,source:e.source};if(ku(t[r])){const V=t[r];t[r]=(f=V.next)==null?void 0:f.bind(V),t[r+1]=(m=V.error)==null?void 0:m.bind(V),t[r+2]=(p=V.complete)==null?void 0:p.bind(V)}let o,a,c;if(n instanceof at)a=ae(n.firestore,_n),c=Xi(n._key.path),o={next:V=>{t[r]&&t[r](O_(a,n,V))},error:t[r+1],complete:t[r+2]};else{const V=ae(n,Rr);a=ae(V.firestore,_n),c=V._query;const C=new Do(a);o={next:x=>{t[r]&&t[r](new He(a,C,V,x))},error:t[r+1],complete:t[r+2]},Ol(n._query)}const h=xo(a);return P_(h,c,s,o)}function Ll(n,t){const e=xo(n);return C_(e,t)}function O_(n,t,e){const r=e.docs.get(t._key),s=new Do(n);return new Ge(n,s,t._key,r,new Kn(e.hasPendingWrites,e.fromCache),t.converter)}(function(t,e=!0){$f(Sf),os(new nr("firestore",((r,{instanceIdentifier:s,options:o})=>{const a=r.getProvider("app").getImmediate(),c=new _n(new zf(r.getProvider("auth-internal")),new Qf(a,r.getProvider("app-check-internal")),fd(a,s),a);return o={useFetchStreams:e,...o},c._setSettings(o),c}),"PUBLIC").setMultipleInstances(!0)),un(Du,Nu,t),un(Du,Nu,"esm2020")})();var L_="firebase",M_="12.15.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */un(L_,M_,"app");export{bf as a,j_ as b,$_ as c,q_ as d,z_ as e,H_ as f,F_ as g,Cf as i,Q_ as o,G_ as s};
