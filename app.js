/* ═══════════════════════════════════════════════════════════
   NOVA NAKLİYAT - INTERACTIVE LOGIC (ANTALYA)
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    const calcRoom = document.getElementById('calcRoom');
    const calcDistrict = document.getElementById('calcDistrict');
    const calcElevator = document.getElementById('calcElevator');
    const totalNakliyatPrice = document.getElementById('totalNakliyatPrice');
    const btnLockNakliyatPrice = document.getElementById('btnLockNakliyatPrice');

    const updateNakliyatPrice = () => {
        if (!calcRoom || !totalNakliyatPrice) return;

        const baseOption = calcRoom.options[calcRoom.selectedIndex];
        let basePrice = parseInt(baseOption.getAttribute('data-price')) || 4999;

        let districtFee = 0;
        const distVal = calcDistrict?.value || 'muratpasa';
        if (distVal === 'dosemealti') districtFee = 1000;
        else if (distVal === 'serik-belek') districtFee = 1500;
        else if (distVal === 'kemer') districtFee = 2000;
        else if (distVal === 'alanya') districtFee = 3500;

        let elevatorFee = 0;
        const elevVal = calcElevator?.value || 'cift';
        if (elevVal === 'cift') elevatorFee = 1000;
        else if (elevVal === 'bina') elevatorFee = -500;

        const totalPrice = basePrice + districtFee + elevatorFee;
        totalNakliyatPrice.textContent = `${totalPrice.toLocaleString('tr-TR')} TL`;
    };

    if (calcRoom) calcRoom.addEventListener('change', updateNakliyatPrice);
    if (calcDistrict) calcDistrict.addEventListener('change', updateNakliyatPrice);
    if (calcElevator) calcElevator.addEventListener('change', updateNakliyatPrice);

    updateNakliyatPrice();

    if (btnLockNakliyatPrice) {
        btnLockNakliyatPrice.addEventListener('click', () => {
            const roomText = calcRoom.options[calcRoom.selectedIndex].text;
            const distText = calcDistrict.options[calcDistrict.selectedIndex].text;
            const elevText = calcElevator.options[calcElevator.selectedIndex].text;
            const finalPrice = totalNakliyatPrice.textContent;

            const message = `Merhaba Nova Nakliyat, web siteniz üzerinden ulaştım. Antalya içi asansörlü evden eve nakliyat için aşağıdaki detaylar doğrultusunda ${finalPrice}'lik paket teklifini dondurmak istiyorum:\n\n🏠 Ev Tipi: ${roomText}\n📍 Güzergah: ${distText}\n🛗 Asansör: ${elevText}\n💰 Net Fiyat: ${finalPrice}`;
            const waUrl = `https://wa.me/905300000000?text=${encodeURIComponent(message)}`;

            window.open(waUrl, '_blank');
        });
    }

});
