function initMap(){function e(e,t){var s=new google.maps.Marker({map:i,icon:"/images/map-marker.png",position:e}),a='<div class="marker"><p class="adress">'+t+"</p></div>",o=new google.maps.InfoWindow({content:a});google.maps.event.addListener(s,"click",function(){o.open(i,s)})}var t=[],s=new google.maps.StyledMapType(t,{name:"Styled Map"}),i=new google.maps.Map(document.getElementById("map"),{scrollwheel:!1,maxZoom:13,mapTypeControlOptions:{mapTypeIds:[google.maps.MapTypeId.ROADMAP,"map_style"]}});i.mapTypes.set("map_style",s),i.setMapTypeId("map_style");var a=new google.maps.LatLngBounds;!function(t){(new google.maps.Geocoder).geocode({address:t},function(s,o){if(o===google.maps.GeocoderStatus.OK){var n=s[0].geometry.location;a.extend(n),e(n,t),i.fitBounds(a),i.panToBounds(a)}else console.log("Адрес не найден по следующим причинам: "+o)})}(mapAdress.innerHTML),google.maps.event.addDomListener(window,"resize",function(){i.fitBounds(a),i.panToBounds(a)}),google.maps.event.trigger(i,"resize")}document.onready=function(){initMap()};
initMap();
// var locations = [
//     ["ЖК «Столичный»1", 43.41165699, 39.95744705, "http://localhost:3000/images/cases/gk1.jpg", "18 квартир", "Площадь: от 59 м2", "ОТ 6 700 000 ₽"],
//     ["ЖК «Столичный»2", 43.4042992, 39.98285294, "http://localhost:3000/images/cases/gk1.jpg", "18 квартир", "Площадь: от 59 м2", "ОТ 6 700 000 ₽"],
// ];
if ( $("#map-object").length ) {
var locations = [
    ["ЖК «Столичный»1", 43.4015339, 39.9794593, "http://localhost:3000/images/cases/gk1.jpg", "18 квартир", "Площадь: от 59 м2", "ОТ 6 700 000 ₽"]
];
var map = new google.maps.Map(document.getElementById('map-object'), {
zoom: 12,
center: new google.maps.LatLng(43.4015339, 39.9794593),
mapTypeId: google.maps.MapTypeId.ROADMAP
});

var infowindow = new google.maps.InfoWindow();
var marker, i;

for (i = 0; i < locations.length; i++) {
marker = new google.maps.Marker({
position: new google.maps.LatLng(locations[i][1], locations[i][2]),
map: map,
icon: {
url: "/images/marker_min.png",
scaledSize: new google.maps.Size(34, 38)
}
});
$(".js-case-map").click(function(){
    var index = $(this).closest(".cases-list__item").index();
    var marker2 = new google.maps.Marker({
        position: new google.maps.LatLng(locations[index][1], locations[index][2]),
        map: map,
        icon: {
        url: "/images/marker_min.png",
        scaledSize: new google.maps.Size(34, 38)
        }
    });
    var contentString = `<div class="cases-list__row">
                                        <div class="cases-list__img cases-list__img_visible"><img src="` + locations[index][3] + `" alt=""></div>
                                        <div class="cases-list__content">
                                            <div class="cases-list__title ff_trajan font_size22">` + locations[index][0] + `</div>
                                            <div class="cases-list__options">
                                                <div class="cases-list__option">
                                                    <div class="font_size14 fade05 fw_medium">` + locations[index][4] + `</div>
                                                </div>
                                                <div class="cases-list__option">
                                                    <div class="font_size14 fade05 fw_medium">` + locations[index][5] + `</div>
                                                </div>
                                            </div>
                                            <div class="cases-list__price color_yelow">
                                                <div class="font_size22 fw_medium ff_trajan">` + locations[index][6] + `</div>
                                            </div>
                                        </div>
                                    </div>`;
    infowindow.setContent(contentString);
    infowindow.open(map, marker2);
});
    
$(".js-case-map:first").click();
google.maps.event.addListener(marker, 'click', (function(marker, i) {
    return function() {
        var contentString = `<div class="cases-list__row">
                                        <div class="cases-list__img cases-list__img_visible"><img src="` + locations[i][3] + `" alt=""></div>
                                        <div class="cases-list__content">
                                            <div class="cases-list__title ff_trajan font_size22">` + locations[i][0] + `</div>
                                            <div class="cases-list__options">
                                                <div class="cases-list__option">
                                                    <div class="font_size14 fade05 fw_medium">` + locations[i][4] + `</div>
                                                </div>
                                                <div class="cases-list__option">
                                                    <div class="font_size14 fade05 fw_medium">` + locations[i][5] + `</div>
                                                </div>
                                            </div>
                                            <div class="cases-list__price color_yelow">
                                                <div class="font_size22 fw_medium ff_trajan">` + locations[i][6] + `</div>
                                            </div>
                                        </div>
                                    </div>`;
        infowindow.setContent(contentString);
        infowindow.open(map, marker);
    }
})(marker, i));
}

}