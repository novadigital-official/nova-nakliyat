/* ═══════════════════════════════════════════════════════════
   NOVA NAKLİYAT - INTERACTIVE LOGIC & CALCULATOR (ANTALYA)
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── INSTANT NAKLİYE CALCULATOR ENGINE ─────────────────────
    const calcRoom = document.getElementById('calcRoom');
    const calcDistrict = document.getElementById('calcDistrict');
    const calcElevator = document.getElementById('calcElevator');
    const totalPriceResult = document.getElementById('totalPriceResult');
    const calcSubmitBtn = document.getElementById('calcSubmitBtn');

    const updatePrice = () => {
        if (!calcRoom || !totalPriceResult) return;

        // Base room price from data attribute
        const selectedRoomOption = calcRoom.options[calcRoom.selectedIndex];
        let basePrice = parseInt(selectedRoomOption.getAttribute('data-price')) || 4999;

        // District surcharge
        let districtFee = 0;
        const distVal = calcDistrict?.value || 'muratpasa';
        if (distVal === 'dosemealti') districtFee = 1000;
        else if (distVal === 'serik-belek') districtFee = 1500;
        else if (distVal === 'kemer') districtFee = 2000;
        else if (distVal === 'alanya') districtFee = 3500;

        // Elevator fee
        let elevatorFee = 0;
        const elevVal = calcElevator?.value || 'cift';
        if (elevVal === 'tek') elevatorFee = 0;
        else if (elevVal === 'cift') elevatorFee = 1000;
        else if (elevVal === 'bina') elevatorFee = -500; // Discount if building elevator available

        const totalPrice = basePrice + districtFee + elevatorFee;

        // Format TL
        totalPriceResult.textContent = `${totalPrice.toLocaleString('tr-TR')} TL`;
    };

    // Attach Change Event Listeners
    if (calcRoom) calcRoom.addEventListener('change', updatePrice);
    if (calcDistrict) calcDistrict.addEventListener('change', updatePrice);
    if (calcElevator) calcElevator.addEventListener('change', updatePrice);

    // Initial Price Run
    updatePrice();

    // WhatsApp Submit Action with Prefilled Message
    if (calcSubmitBtn) {
        calcSubmitBtn.addEventListener('click', () => {
            const roomText = calcRoom.options[calcRoom.selectedIndex].text;
            const distText = calcDistrict.options[calcDistrict.selectedIndex].text;
            const elevText = calcElevator.options[calcElevator.selectedIndex].text;
            const finalPrice = totalPriceResult.textContent;

            const message = `Merhaba, web siteniz üzerinden ulaştım. Antalya Evden Eve Nakliyat için aşağıdaki detaylar doğrultusunda ${finalPrice}'lik teklifi dondurmak istiyorum:\n\n🏠 Ev Tipi: ${roomText}\n📍 Güzergah: ${distText}\n🛗 Asansör: ${elevText}\n💰 Tahmini Fiyat: ${finalPrice}`;
            const waUrl = `https://wa.me/905300000000?text=${encodeURIComponent(message)}`;

            window.open(waUrl, '_blank');
        });
    }

    // ─── SMOOTH SCROLL FOR NAV LINKS ──────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElem = document.querySelector(targetId);
            if (targetElem) {
                e.preventDefault();
                targetElem.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});
