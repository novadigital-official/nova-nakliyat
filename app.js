/* ══════════════════════════════════════════════════════════════
   NOVA NAKLİYAT - INTERACTIVE LOGIC & ADS CONVERSION TRACKING (ANTALYA)
   ══════════════════════════════════════════════════════════════ */

window.dataLayer = window.dataLayer || [];
function gtag(){ window.dataLayer.push(arguments); }

document.addEventListener('DOMContentLoaded', () => {

    const calcRoom = document.getElementById('calcRoom');
    const calcDistrict = document.getElementById('calcDistrict');
    const calcElevator = document.getElementById('calcElevator');
    const totalNakliyatPrice = document.getElementById('totalNakliyatPrice');
    const btnLockNakliyatPrice = document.getElementById('btnLockNakliyatPrice');

    const updateNakliyatPrice = () => {
        if (!calcRoom || !totalNakliyatPrice) return;

        const baseOption = calcRoom.options[calcRoom.selectedIndex];
        let basePrice = parseInt(baseOption.getAttribute('data-price')) || 15000;

        let districtFee = 0;
        const distVal = calcDistrict?.value || 'muratpasa';
        if (distVal === 'dosemealti') districtFee = 800;
        else if (distVal === 'serik-belek') districtFee = 1200;
        else if (distVal === 'kemer') districtFee = 1500;
        else if (distVal === 'alanya') districtFee = 2500;

        let elevatorFee = 0;
        const elevVal = calcElevator?.value || 'cift';
        if (elevVal === 'cift') elevatorFee = 800;
        else if (elevVal === 'bina') elevatorFee = -400;

        const totalPrice = basePrice + districtFee + elevatorFee;
        totalNakliyatPrice.textContent = `${totalPrice.toLocaleString('tr-TR')} TL`;
    };

    if (calcRoom) calcRoom.addEventListener('change', updateNakliyatPrice);
    if (calcDistrict) calcDistrict.addEventListener('change', updateNakliyatPrice);
    if (calcElevator) calcElevator.addEventListener('change', updateNakliyatPrice);

    updateNakliyatPrice();

    const btnAction = document.getElementById('btnCalculateNakliyat') || document.getElementById('btnLockNakliyatPrice');

    if (btnAction) {
        btnAction.addEventListener('click', () => {
            const roomText = calcRoom ? calcRoom.options[calcRoom.selectedIndex].text : 'Standart Ev Taşıma';
            const distText = calcDistrict ? calcDistrict.options[calcDistrict.selectedIndex].text : 'Muratpaşa';
            const finalPrice = totalNakliyatPrice ? totalNakliyatPrice.textContent : '₺15.000';

            // Ads Conversion Trigger
            window.dataLayer.push({
                event: 'generate_lead',
                conversion_type: 'whatsapp_nakliyat_calc',
                package_type: roomText,
                estimated_value: finalPrice,
                currency: 'TRY'
            });
            if (typeof fbq === 'function') {
                fbq('track', 'Lead', { content_name: 'Nakliyat Teklifi', value: 15000, currency: 'TRY' });
            }

            const message = `Merhaba, AntalyadaNakliyat.com.tr üzerinden ulaştım. Antalya içi asansörlü evden eve nakliyat için aşağıdaki detaylar doğrultusunda ${finalPrice}'lik paket teklifini almak istiyorum:\n\n• Paket Tipi: ${roomText}\n• Güzergah: ${distText}\n• Fiyat Aralığı: ${finalPrice}`;
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
