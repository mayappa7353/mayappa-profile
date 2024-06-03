/* =========================== Typing Animation =================================*/
var typed = new Typed(".typing",{
    strings: ["System Administrator", "Web Designer", "IT Help Desk"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
})

/* =========================== Aside =================================*/
const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totalNavList = navList.length,
    allSection = document.querySelectorAll(".section"),
    totalSection = allSection.length;
    for(let i=0; i<totalNavList; i++)
    {
        const a = navList[i].querySelector("a");
        a.addEventListener("click", function()
        {
            removeBackSection();
            for(let j=0; j<totalNavList; j++)
            {
                if(navList[j].querySelector("a").classList.contains("active"))
                {
                    addBackSection(j);
                    //allSection[j].classList.add("back-section");
                    /*console.log("back-section" + navList[j].querySelector("a"))*/
                }
                navList[j].querySelector("a").classList.remove("active");
            }
            this.classList.add("active")
            showSection(this);
            if(window.innerWidth < 1200)
            {
                asideSectionTogglerBtn();
            }
        })
    }

    function removeBackSection()
    {
        for(let i=0; i<totalSection; i++)
            {
                allSection[i].classList.remove("back-section");
            }
    }
    function addBackSection(num)
    {
        allSection[num].classList.add("back-section");
    }
    function showSection(element)
    {
        for(let i=0; i<totalSection; i++)
        {
            allSection[i].classList.remove("active");
        }
        const target = element.getAttribute("href").split('#')[1];
        document.querySelector("#" + target).classList.add("active")
    }

    function updateNav(element)
    {
        for(let i=0; i<totalNavList; i++)
        {
            navList[i].querySelector("a").classList.remove("active");
            const target = element.getAttribute("href").split('#')[1];
            if(target === navList[1].querySelector("a").getAttribute("href").split("#")[1])
            {
                navList[i].querySelector("a").classList.add("active");
            }
        }
    }

    document.querySelector(".hire-me").addEventListener("click", function()
    {
        const sectionIndex = this.getAttribute("data-section-index");
        //console.log(sectionIndex);
        showSection(this);
        updateNav(this);
        removeBackSection();
        addBackSection(sectionIndex)
    })

    const navTogglerBtn = document.querySelector(".nav-toggler"),
        aside = document.querySelector(".aside");
        navTogglerBtn.addEventListener("click", () => 
        {
            asideSectionTogglerBtn();
        })
        function asideSectionTogglerBtn()
        {
            aside.classList.toggle("open");
            navTogglerBtn.classList.toggle("open")
            for(let i=0; i<totalSection; i++)
            {
                allSection[i].classList.toggle("open");
            }
        }


/*============== Email JS ===============*/

const  contactForm = document.getElementById('contact-form'),
       contactName = document.getElementById('user_name'),
       contactNumber = document.getElementById('user_number'),
       contactEmail = document.getElementById('user_email'),
       contactCountry = document.getElementById('user_country'),
       contactSubject = document.getElementById('user_subject'),
       contactMessage = document.getElementById('user_message')

const sendEmail = (e) =>{
    e.preventDefault()

    //check if the field has a value
    if(contactName.value === '' || contactNumber.value === '' || contactEmail.value === '' || contactCountry.value === '' || contactSubject.value === '' || contactMessage.value === ''){
        //Add and remove color
        contactMessage.classList.remove('color-blue')
        contactMessage.classList.add('color-red')

        //Show Message
        contactMessage.textContent = 'Write all the input fields 💌'
    }else{
        //serviceID - templateID - #form - publicKey
        emailjs.sendForm('service_rx293ve','template_l9dtt6q','#contact-form','0lxU3V6tAk1gilGKl')
        .then(() =>{
            //Show message and add color
            contactMessage.classList.add('color-blue')
            contactMessage.textContent = 'Thank you for submitting the form✅. We will conncet you as soon as possible'

            //Remove message after five seconds
            setTimeout(() => {
                contactMessage.textContent = ''
            }, 5000)
        }, (error) =>{
            alert('OOPS! SOMETHING HAS FAILED....', error)
        })

        // To clear the input field
        contactName.value = ''
        contactNumber.value = ''
        contactEmail.value = ''
        contactCountry.value = ''
        contactSubject.value = ''
        contactMessage.value = ''
    }
}

contactForm.addEventListener('submit', sendEmail )
