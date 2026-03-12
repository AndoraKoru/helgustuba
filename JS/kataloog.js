const products = [
    {
        name: "KOHINA",
        img:      "Assets/Images/Catalogue/kohinaCataloguePicture.jpg",
        imgSpecs: "Assets/Images/Catalogue/kohinaCataloguePicture2.jpg",
        pdf: "#",
        description: "Kohina on vaikse kohalolu ilu. Nagu lühike juga, mis ei mõju oma suuruse, vaid oma iseloomu ja kerge heli kaudu, toob ka see mudel vannituppa õhulisust ja elegantsust.",
        specs: "Mõõdud: 660x415x465mm. Kaal: 46.5kg. Pinge/Sagedus: 220V / 50Hz. Garantii: 2 + 5 aastat. Loputusvee kogus: 2,7 l / 4,2 l. Loputuskast: sisse ehitatud. Väljavool: tahavooluga 180 mm (Allavooluga variant on tellitav 300-400 mm). Sertifikaat: CE."
    },
    {
        name: "VALASTE",
        img:      "Assets/Images/Catalogue/valasteCataloguePicture.jpg",
        imgSpecs: "Assets/Images/Catalogue/valasteCataloguePicture2.jpg",
        pdf: "#",
        description: "Valaste on väljapaistva vormiga nutitualett, mille inspiratsioon pärineb Baltimaade kõrgeima tehisliku joa geoloogilisest ilust. Muudetavad värvikihtide lahendused ülaplaadil ja külgedel loovad disaini, mis meenutab paekalda kihistusi ja toob vannituppa sügavuse ning isikupära.",
        specs: "Mõõdud: 660x415x465mm. Kaal: 46.5kg. Pinge/Sagedus: 220V / 50Hz. Garantii: 2 + 5 aastat. Loputusvee kogus: 2,7 l / 4,2 l. Loputuskast: sisse ehitatud. Väljavool: tahavooluga 180 mm (Allavooluga variant on tellitav 300-400 mm). Sertifikaat: CE."
    },
    {
        name: "UKUORU",
        img:      "Assets/Images/Catalogue/ukuoruCataloguePicture.jpg",
        imgSpecs: "Assets/Images/Catalogue/ukuoruCataloguePicture2.jpg",
        pdf: "#",
        description: "Ukuoru on lihtsa ja voolujoonelise disainiga nutitualett, mille vorm mõjub pehmelt, puhtalt ja loomulikult. Inspireerituna Ukuoru joastiku sujuvast liikumisest, toob see mudel vannituppa tasakaalu, kergust ja vaikset elegantsi.",
        specs: "Mõõdud: 660x415x465mm. Kaal: 46.5kg. Pinge/Sagedus: 220V / 50Hz. Garantii: 2 + 5 aastat. Loputusvee kogus: 2,7 l / 4,2 l. Loputuskast: sisse ehitatud. Väljavool: tahavooluga 180 mm (Allavooluga variant on tellitav 300-400 mm). Sertifikaat: CE."
    },
    {
        name: "JÄGALA",
        img:      "Assets/Images/Catalogue/jägalaCataloguePicture.jpg",
        imgSpecs: "Assets/Images/Catalogue/jägalaCataloguePicture2.jpg",
        pdf: "#",
        description: "Jägala juga on Eesti loodusjõu üks selgemaid sümboleid – lai, võimas ja iseloomult põhjamaine. Sama mõte kandub ka selle mudeli disaini: nurgeline vorm meenutab paekallast, tugev siluett loob ruumis kohalolu ning puhas joonekasutus mõjub sama selgelt nagu langev veekardin.",
        specs: "Mõõdud: 660x415x465mm. Kaal: 46.5kg. Pinge/Sagedus: 220V / 50Hz. Garantii: 2 + 5 aastat. Loputusvee kogus: 2,7 l / 4,2 l. Loputuskast: sisse ehitatud. Väljavool: tahavooluga 180 mm (Allavooluga variant on tellitav 300-400 mm). Sertifikaat: CE."
    }
];

document.querySelectorAll('.kataloogStage').forEach((stage, i) => {
    const product  = products[i];
    let view = 0;

    const img      = stage.querySelector('.kataloogImg');
    const name     = stage.querySelector('.kataloogName');
    const subtitle = stage.querySelector('.kataloogSubtitle');
    const features = stage.querySelector('.kataloogFeatures');
    const specs    = stage.querySelector('.kataloogSpecs');
    const download = stage.querySelector('.kataloogDownload');

    function render() {
        name.textContent  = product.name;
        download.href     = product.pdf;

        img.classList.remove('sliding');
        img.getBoundingClientRect();
        img.src = view === 0 ? product.img : product.imgSpecs;
        img.alt = product.name;
        img.classList.add('sliding');

        if (view === 0) {
            subtitle.textContent    = 'Tootest';
            features.innerHTML      = `<li>${product.description}</li>`;
            features.style.display  = '';
            specs.style.display     = 'none';
        } else {
            subtitle.textContent    = 'Tehnilised andmed';
            specs.innerHTML         = `<p>${product.specs}</p>`;
            features.style.display  = 'none';
            specs.style.display     = '';
        }
    }

    stage.querySelector('.kataloogPrev').addEventListener('click', () => {
        view = view === 1 ? 0 : 1;
        render();
    });

    stage.querySelector('.kataloogNext').addEventListener('click', () => {
        view = view === 0 ? 1 : 0;
        render();
    });

    render();
});
