// Todos aquellos archivos que nuestra app utilice
const STATIC = 'staticv2';
const INMUTABLE = 'inmutablev1';
const DYNAMIC = 'dynamicv1';
const APP_SHELL = [
  '/',
  '/index.html',
  'js/app.js',
  'img/gato.jpg',
  'css/style.css',
  'img/oso.jpg'
];

const APP_SHELL_INMUTABLE = [
  'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css'
]

self.addEventListener('install', (e)=>{
  console.log("Instalando ");
  //e.skipWaiting();
  const staticCache = caches.open(STATIC)
  .then(cache => {
    cache.addAll(APP_SHELL)
  })
  const inmutable = caches.open(INMUTABLE).then(cache => {
    cache.addAll(APP_SHELL_INMUTABLE);
  })

});

self.addEventListener('activate', (e)=>{
  console.log("Activado " );

});

self.addEventListener('fetch', (e)=>{
  //Cache only
  //1.-e.respondWith(caches.mate(e.request))

  // Cache with network fallback
  //Siempre busca en cache y si no en internet
  //2.-  const source = caches.match(e.request)
  //  .then(res => {
  //   if(res) return res;
  //   return fetch(e.request).then(resFetch=>{
  //     caches.open(DYNAMIC).then(cache => {
  //       cache.put(e.request, resFetch)
  //     })
  //     return resFetch.clone();
  //   })
  //  })
  //  e.respondWith(source);

  //3. Network with cache fallback
  //const source = fetch(e.request).then(res => {
    //if(!res) throw Error("NotFound")
    //caches.open(DYNAMIC).then(cache=>{
   //   cache.put(e.request, res)
  // })
  //  return res.clone();
  //})
  //.catch((err)=>{
  //  return caches.match(e.request);
  //})
  //e.respondWith(source)

  //4 Chache with network update
  // Primero todo lo devuelve del caché
  // Después actualiza el recurso.
  // Rendimiento critico

//   const source = caches.open/STATIC.then(cache => {
//     fetch(e.request).then((resFetch) => {
//         cache.put(e.request, resFetch)
//     });
//     return cache.match(e.request);

//   })
//   e.response(source);   

  //5 Chache and network race
  const source = new Promise((resolve, reject) => {
    let flag = false;
    const falisOnce = () =>{
        if(flag){
            // Si falloó una vez aquí vamos a poner la logica para controlarlo
            if (/\.(png|jpg)/i.test(e.request.url)){
                resolve(caches.match('/img/not-found.img'));
            }else{
                reject('SourcenOTfOUND')
            }
                
        }else{
            flag = true;
        }
    };
    fetch(E.request).then(resFetch  => {
        resFetch.ok ? resolve(resFetch): falisOnce();
    }).catch(falisOnce);
    caches.match(e.request).then(sourceCache => {
        sourceCache.ok ? resolve(sourceCache) : falisOnce();
    }).catch(falisOnce);
  });
  
  e.respondWith(source);
});