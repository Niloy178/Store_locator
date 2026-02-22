const map = L.map('map').setView([22.907, 79.073], 5)

// Assigning base layer
const osm_link = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
const osm = L.tileLayer(osm_link).addTo(map)

const ul = document.querySelector('.list')

function shop_list(){
    storeList.forEach((shop)=>{
    // console.log(shop.properties.name)
    // console.log(shop.properties.address)
    const li = document.createElement('li')
    const div = document.createElement('div')
    div.classList.add('shop_info')
    const a = document.createElement('a')
    a.href = '#'
    a.innerText = shop.properties.name
    a.addEventListener('click', ()=>{
        fly_to_shop(shop)
    })

    const p = document.createElement('p')
    p.innerText = shop.properties.address

    div.appendChild(a)
    div.appendChild(p)

    li.appendChild(div)

    ul.appendChild(li)
})
}

shop_list()


function popup_content(feature){
    return (`
        <div> 
            <h4> ${feature.properties.name} </h4>
            <p> ${feature.properties.address} </p>
            <div class="phone"> 
                <a href="tel:${feature.properties.phone}"> ${feature.properties.phone} </a>
            </div>
        </div>
    `)
}


function each_feature(feature, layer){
    layer.bindPopup(popup_content(feature), {closeButton: false, offset: L.point(0,-8) })
}

var myIcon = L.icon({
    iconUrl: 'marker.png',
    iconSize: [30,40],
    // className: 'blinking'
})

const shop_layer = L.geoJSON(storeList, {
    onEachFeature:each_feature,
    pointToLayer: (feature, latlng)=>{
        return L.marker(latlng, {icon:myIcon})
    }

}).addTo(map)

function fly_to_shop(shop){
    // console.log(shop)
    const coords = [shop.geometry.coordinates[1], shop.geometry.coordinates[0]]
    map.flyTo(coords, 14, {
        duration: 1,
    })
    
    setTimeout(()=>{
        L.popup({closeButton: false, offset: L.point(0,-8)})
        .setLatLng(coords)
        .setContent(popup_content(shop))
        .openOn(map)
    }, 1000)
}
