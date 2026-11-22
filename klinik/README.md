# Diş Kliniği 3D

Zemin kat diş kliniği planının tarayıcıda çalışan 3D modeli. Emlak ve klinik tanıtımı için hazırlanmış tek sayfalık bir prototiptir.

## Açmak için

`index.html` dosyasını tarayıcıda açmanız yeterli. Kurulum gerekmez; Three.js (r128) CDN üzerinden yüklenir, bu yüzden internet bağlantısı gerekir.

Yayın adresi: https://l1bertech.com/klinik/

## Özellikler

- **Plan, 3D ve İçinde gez** görünümleri
- Projeden aktarılan oda yerleşimi: bekleme alanı (48,56 m²), Klinik-1 (18,40 m²), Klinik-2 (15,51 m²), röntgen odası (6,80 m²), koridor, lavabo ve WC
- Klinik ekipmanı kataloğu: diş ünitesi, klinik tezgâhı, panoramik ve ağız içi röntgen, sterilizasyon tezgâhı, UV dolabı, kurşun paravan, resepsiyon bankosu, bekleme koltukları
- Eşyaları sürükleme, 45° döndürme, renk değiştirme, silme
- Kapı ve pencereleri duvar boyunca sürükleme; köşede yan duvara geçer
- Duvara tıklayıp cam duvar yapma, kapı veya pencere ekleme
- Geri al ve planı sıfırlama; değişiklikler tarayıcıda (localStorage) saklanır

## Plan verisi

Plan `index.html` içinde `CL_ROOMS` (odalar), `CL_WALLS` (duvarlar, kapı ve pencere açıklıkları) ve `CL_DEFAULT` (eşya yerleşimi) dizilerinde metre cinsinden tutulur. Ölçüler plan fotoğrafından okunmuştur; birkaç santimlik sapma olabilir.
