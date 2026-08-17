/* ══════════════════════════════════════════════════════════════
   NOVA NAKLİYAT - INTERACTIVE LOGIC & ADS CONVERSION TRACKING (ANTALYA)
   ══════════════════════════════════════════════════════════════ */

window.dataLayer = window.dataLayer || [];
function gtag(){ window.dataLayer.push(arguments); }

document.addEventListener('DOMContentLoaded', () => {

    const calcRoom = document.getElementById('calcRoom');
    const calcElevator = document.getElementById('calcElevator');
    const calcDistrict = document.getElementById('calcDistrict');
    const totalNakliyatPrice = document.getElementById('totalNakliyatPrice');

    const updateNakliyatPrice = () => {
        if (!totalNakliyatPrice) return;

        // Oda baz fiyatı (Usta maliyeti + Bizim Kârımız: 1+1=17k, 2+1=21k, 3+1=25k, 4+1=31k)
        let roomBase = calcRoom ? (parseInt(calcRoom.value) || 17000) : 17000;

        // Asansör bedeli (Her asansör +3.000 TL)
        let elevatorFee = 0;
        const elevVal = calcElevator ? calcElevator.value : '0';
        if (elevVal === '1') {
            elevatorFee = 3000;
        } else if (elevVal === '2') {
            elevatorFee = 6000;
        }

        // İlçe mesafe farkı
        let districtFee = 0;
        const distVal = calcDistrict ? calcDistrict.value : 'muratpasa';
        if (distVal === 'dosemealti') {
            districtFee = 1500;
        } else if (distVal === 'serik-belek' || distVal === 'kemer') {
            districtFee = 2000;
        } else if (distVal === 'alanya') {
            districtFee = 4000;
        }

        const totalPrice = roomBase + elevatorFee + districtFee;
        totalNakliyatPrice.textContent = `${totalPrice.toLocaleString('tr-TR')} TL`;
    };

    if (calcRoom) calcRoom.addEventListener('change', updateNakliyatPrice);
    if (calcElevator) calcElevator.addEventListener('change', updateNakliyatPrice);
    if (calcDistrict) calcDistrict.addEventListener('change', updateNakliyatPrice);

    updateNakliyatPrice();

    const btnAction = document.getElementById('btnCalculateNakliyat') || document.getElementById('btnLockNakliyatPrice');

    if (btnAction) {
        btnAction.addEventListener('click', () => {
            const roomText = calcRoom ? calcRoom.options[calcRoom.selectedIndex].text : '1+1 Daire Taşıma';
            const elevText = calcElevator ? calcElevator.options[calcElevator.selectedIndex].text : 'Asansörsüz';
            const distText = calcDistrict ? calcDistrict.options[calcDistrict.selectedIndex].text : 'Muratpaşa';
            const finalPrice = totalNakliyatPrice ? totalNakliyatPrice.textContent : '17.000 TL';

            // Ads Conversion Trigger
            window.dataLayer.push({
                event: 'generate_lead',
                conversion_type: 'whatsapp_nakliyat_calc',
                package_type: roomText,
                elevator_type: elevText,
                estimated_value: finalPrice,
                currency: 'TRY'
            });
            if (typeof fbq === 'function') {
                fbq('track', 'Lead', { content_name: 'Nakliyat Teklifi', value: parseInt(finalPrice.replace(/\D/g, '')) || 17000, currency: 'TRY' });
            }

            const message = `Merhaba, AntalyadaNakliyat.com.tr üzerinden hesapladım. Antalya evden eve nakliyat için randevu ve sözleşme detaylarını almak istiyorum:\n\n• Oda Tipi: ${roomText}\n• Asansör Durumu: ${elevText}\n• Güzergah: ${distText}\n• Hesaplanan Tutar: ${finalPrice}`;
            const waUrl = `https://wa.me/905070871789?text=${encodeURIComponent(message)}`;

            window.open(waUrl, '_blank');
        });
    }

    // Phone Click Conversion Tracking
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function() {
            window.dataLayer.push({
                event: 'contact_phone_click',
                phone_number: '05070871789',
                lead_category: 'Nakliyat Telefon'
            });
            if (typeof fbq === 'function') {
                fbq('track', 'Contact', { content_name: 'Phone Call' });
            }
        });
    });

});
