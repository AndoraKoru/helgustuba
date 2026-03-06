const products = [
    {
        name: "JÄGALA",
        img:      "Assets/Images/Catalogue/jägalaCataloguePicture.jpg",
        imgSpecs: "Assets/Images/Catalogue/jägalaCataloguePicture2.jpg",
        pdf: "#",
        features: [
            "Kompaktne ja seinale kinnitatav disain – stiilne ja ruumisäästlik",
            "Integreeritud veepaak – lihtne paigaldus ja hooldus ilma lisavaevata",
            "Laserprojektsiooniga jalasensor – puutevaba, nutikas ja vastupidav",
            "UV-steriliseerimine – automaatne düüsi hügieen",
            "Veemassaaž – pakub lõõgastavat ja värskendavat kogemust",
            "Katlakivi eemaldamise funktsioon – hoiab tualeti puhta ja katlakivivabana",
            "Automaatne kahe loputusrežiimi tuvastus – säästab kuni 50% vett"
        ],
        specs: [
            { label: "Mõõdud",        value: "660x415x465mm" },
            { label: "Kaal",          value: "46.5kg"        },
            { label: "Pinge/Sagedus", value: "220V / 50Hz"   },
            { label: "Nimivõimsus",   value: "1150W"         }
        ]
    },
    {
        name: "UKUORU",
        img:      "Assets/Images/Catalogue/ukuoruCataloguePicture.jpg",
        imgSpecs: "Assets/Images/Catalogue/ukuoruCataloguePicture2.jpg",
        pdf: "#",
        features: [
            "Kompaktne ja seinale kinnitatav disain – stiilne ja ruumisäästlik",
            "Integreeritud veepaak – lihtne paigaldus ja hooldus ilma lisavaevata",
            "Laserprojektsiooniga jalasensor – puutevaba, nutikas ja vastupidav",
            "UV-steriliseerimine – automaatne düüsi hügieen",
            "Veemassaaž – pakub lõõgastavat ja värskendavat kogemust",
            "Katlakivi eemaldamise funktsioon – hoiab tualeti puhta ja katlakivivabana",
            "Automaatne kahe loputusrežiimi tuvastus – säästab kuni 50% vett"
        ],
        specs: [
            { label: "Mõõdud",        value: "660x415x465mm" },
            { label: "Kaal",          value: "46.5kg"        },
            { label: "Pinge/Sagedus", value: "220V / 50Hz"   },
            { label: "Nimivõimsus",   value: "1150W"         }
        ]
    },
    {
        name: "KOHINA",
        img:      "Assets/Images/Catalogue/kohinaCataloguePicture.jpg",
        imgSpecs: "Assets/Images/Catalogue/kohinaCataloguePicture2.jpg",
        pdf: "#",
        features: [
            "Kompaktne ja seinale kinnitatav disain – stiilne ja ruumisäästlik",
            "Integreeritud veepaak – lihtne paigaldus ja hooldus ilma lisavaevata",
            "Laserprojektsiooniga jalasensor – puutevaba, nutikas ja vastupidav",
            "UV-steriliseerimine – automaatne düüsi hügieen",
            "Veemassaaž – pakub lõõgastavat ja värskendavat kogemust",
            "Katlakivi eemaldamise funktsioon – hoiab tualeti puhta ja katlakivivabana",
            "Automaatne kahe loputusrežiimi tuvastus – säästab kuni 50% vett"
        ],
        specs: [
            { label: "Mõõdud",        value: "660x415x465mm" },
            { label: "Kaal",          value: "46.5kg"        },
            { label: "Pinge/Sagedus", value: "220V / 50Hz"   },
            { label: "Nimivõimsus",   value: "1150W"         }
        ]
    },
    {
        name: "VALASTE",
        img:      "Assets/Images/Catalogue/valasteCataloguePicture.jpg",
        imgSpecs: "Assets/Images/Catalogue/valasteCataloguePicture2.jpg",
        pdf: "#",
        features: [
            "Kompaktne ja seinale kinnitatav disain – stiilne ja ruumisäästlik",
            "Integreeritud veepaak – lihtne paigaldus ja hooldus ilma lisavaevata",
            "Laserprojektsiooniga jalasensor – puutevaba, nutikas ja vastupidav",
            "UV-steriliseerimine – automaatne düüsi hügieen",
            "Veemassaaž – pakub lõõgastavat ja värskendavat kogemust",
            "Katlakivi eemaldamise funktsioon – hoiab tualeti puhta ja katlakivivabana",
            "Automaatne kahe loputusrežiimi tuvastus – säästab kuni 50% vett"
        ],
        specs: [
            { label: "Mõõdud",        value: "660x415x465mm" },
            { label: "Kaal",          value: "46.5kg"        },
            { label: "Pinge/Sagedus", value: "220V / 50Hz"   },
            { label: "Nimivõimsus",   value: "1150W"         }
        ]
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
            subtitle.textContent    = 'Peamised omadused';
            features.innerHTML      = product.features.map(f => `<li>${f}</li>`).join('');
            features.style.display  = '';
            specs.style.display     = 'none';
        } else {
            subtitle.textContent    = 'Tehnilised andmed';
            specs.innerHTML         = product.specs
                .map(s => `<div class="specRow"><dt>${s.label}</dt><dd>${s.value}</dd></div>`)
                .join('');
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
