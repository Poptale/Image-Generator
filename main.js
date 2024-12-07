let token = "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";
let input = document.querySelector("input");
let btn = document.querySelector("button");
let image = document.querySelector("img");
let p = document.querySelector("p");
let loader = document.querySelector(".loader");

let lastRequestTime = 0;

async function query() {
    const currentTime = Date.now();
    if (currentTime - lastRequestTime < 1000) {
        console.log('Too many requests. Please wait a second.');
        return;
    }

    const response = await fetch(
        "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({"inputs": input.value}),
        }
    );
    const result = await response.blob();
    return result;
}

btn.addEventListener("click", async function () {
    if (input.value === "") {
        image.src = "botimage.png";
        image.style.height = "150px";
        image.style.width = "150px";
        image.style.position = "static";
        p.style.display = "inline";
        p.innerHTML = "Enter a prompt and then click Generate image button to generate image";
    } else if(input.value === "Pratik Jha" || input.value === "pratik jha" || input.value === "PratikJha" || input.value === "pratikjha" || input.value === "Pratikjha" || input.value === "pratikJha" || input.value === "Pratik jha" || input.value === "pratik Jha" || input.value === "Pratik"  || input.value === "pratik"){
        image.src = "myimg.png";
        loader.style.display = 'none'; 
        image.style.display = 'block';
        image.style.position = "absolute";
        image.style.height = "60vh";
        image.style.width = "500px";
    }
    else {
        loader.style.display = 'block';
        p.innerHTML = "It may take a while, please wait for a while...";
        image.style.display = 'none';

        try {
            let response = await query();
            let objectURL = URL.createObjectURL(response);
            image.src = objectURL;
            loader.style.display = 'none'; 
            image.style.display = 'block';
            image.style.position = "absolute";
            image.style.height = "60vh";
            image.style.width = "500px";
            
            lastRequestTime = Date.now();
        } catch (error) {
            console.error("An error occurred:", error);
            
            // Hide loader if there's an error
            loader.style.display = 'none'; 
            image.style.display = 'block';
        }
    }
});