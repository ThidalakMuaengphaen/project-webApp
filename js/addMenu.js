
const dragArea = document.querySelector(".drag-area");
const button = dragArea.querySelector("button");
const input = dragArea.querySelector("input");
const foodNameInput = document.getElementById("idNumber");
const foodTypeSelect = document.getElementById("select");
const saveButton = document.querySelector(".ok button");
const cancelButton = document.querySelector(".cancle button");
const dropImageContainer = document.querySelector(".dropimage-container");

// แสดงฟิลด์ไฟล์เมื่อคลิกที่ปุ่ม
button.onclick = () => {
    input.click();
};

// จัดการการอัปโหลดไฟล์เมื่อมีการลากไฟล์เข้าไปในกรอบบบบบ
dragArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dragArea.classList.add("active");
});

// ลบคลาส active เมื่อการลากไฟล์ออกจากพื้นที่
dragArea.addEventListener("dragleave", () => {
    dragArea.classList.remove("active");
});

// จัดการไฟล์ที่ถูกวาง
dragArea.addEventListener("drop", (event) => {
    event.preventDefault();
    dragArea.classList.remove("active");

    const files = event.dataTransfer.files; // รับไฟล์ที่ถูกวาง
    if (files.length) {
        const file = files[0]; // รับไฟล์ตัวแรก
        uploadFile(file);
    }
});

// จัดการการเลือกไฟล์
input.addEventListener("change", () => {
    const file = input.files[0]; // รับไฟล์ที่ถูกเลือก
    if (file) {
        uploadFile(file);
    }
});

// ฟังก์ชันสำหรับจัดการการอัปโหลดไฟล์
function uploadFile(file) {
    const fileType = file.type;
    const validExtensions = ["image/jpeg", "image/png", "image/gif"]; // เพิ่มประเภทไฟล์อื่น ๆ ถ้าจำเป็น

    if (validExtensions.includes(fileType)) {
        const reader = new FileReader(); // สร้าง FileReader เพื่ออ่านไฟล์
        reader.onload = () => {
            // เคลียร์อิลิเมนต์พวกปุ่มเลือกไฟล์จากอุปกรณ์, text, icon ออก เพื่อแสแดงแต่รูปที่อัปมา
            dragArea.innerHTML = '';

            // สร้างอิลิเมนต์รูปที่เพิ่มมา
            const imgElement = document.createElement("img");
            imgElement.src = reader.result; // ตั้งค่าที่มาเป็นภาพที่อัปโหลด
            imgElement.alt = "Uploaded Image";
            imgElement.style.maxWidth = "100%"; // ทำให้ภาพพอดีกับคอนเทนเนอร์
            imgElement.style.maxHeight = "300px";
            dragArea.appendChild(imgElement); // เพิ่มภาพไปยังพื้นที่ลาก
        };
        reader.readAsDataURL(file); // อ่านไฟล์เป็น Data URL
    } else {
        alert("กรุณาอัปโหลดไฟล์ภาพที่ถูกต้อง (JPEG, PNG, หรือ GIF)"); // แจ้งเตือนสำหรับไฟล์ประเภทไม่ถูกต้อง
    }
}

// ฟังก์ชันสำหรับจัดการการบันทึกข้อมูล
saveButton.onclick = (event) => {
    event.preventDefault(); // ป้องกันพฤติกรรมปกติของปุ่ม

    const foodName = foodNameInput.value.trim(); // รับชื่ออาหาร
    const foodType = foodTypeSelect.value; // รับประเภทอาหาร

    if (foodName === "" || foodType === "") {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน"); // แจ้งเตือนถ้าข้อมูลว่าง
    } else {
        // ส่งข้อมูลไปยังเซิร์ฟเวอร์
        console.log("ข้อมูลถูกบันทึก:", {
            name: foodName,
            type: foodType,
            image: dragArea.querySelector("img") ? dragArea.querySelector("img").src : null,
        });
        alert("ข้อมูลถูกบันทึกเรียบร้อยแล้ว!"); // แจ้งเตือนสำหรับการบันทึกสำเร็จ
    }
};

// ฟังก์ชันสำหรับเคลียร์ข้อมูลทั้งหมด
cancelButton.onclick = (event) => {
    event.preventDefault();
    foodNameInput.value = ""; // เคลียร์ฟิลด์ชื่ออาหาร
    foodTypeSelect.value = ""; // รีเซ็ตการเลือกประเภทอาหาร
    dragArea.innerHTML = ''; // เคลียร์พื้นที่ลาก
    resetDragArea(); // รีเซ็ตพื้นที่ลากกลับสู่สถานะเริ่มต้น พวก  button, icon, text กลับมา
};

// ฟังก์ชันสำหรับรีเซ็ตพื้นที่ลากกลับสู่สถานะเริ่มต้น
function resetDragArea() {
    dragArea.innerHTML = `
        <div class="icon"><i class="fas fa-cloud-upload-alt"></i></div>
        <header>ลาก หรือวางเพื่ออัปโหลดรูปภาพ</header>
        <span>OR</span>
        <button>เลือกรูปภาพจากอุปกรณ์</button>
        <input type="file" hidden>
    `;
    // เลือกปุ่มและฟิลด์ในพื้นที่ลากที่รีเซ็ต
    const newButton = dragArea.querySelector("button");
    const newInput = dragArea.querySelector("input");

    // กำหนดเหตุการณ์คลิกใหม่ให้กับปุ่มใหม่
    newButton.onclick = () => {
        newInput.click();
    };

    // จัดการการอัปโหลดไฟล์เมื่อมีการลากไฟล์เข้ามาในพื้นที่ลากที่รีเซ็ต
    dragArea.addEventListener("dragover", (event) => {
        event.preventDefault();
        dragArea.classList.add("active");
    });

    // ลบคลาส active เมื่อการลากไฟล์ออกจากพื้นที่
    dragArea.addEventListener("dragleave", () => {
        dragArea.classList.remove("active");
    });

    // จัดการไฟล์ที่ถูกวางอีกครั้ง
    dragArea.addEventListener("drop", (event) => {
        event.preventDefault();
        dragArea.classList.remove("active");

        const files = event.dataTransfer.files; // รับไฟล์ที่ถูกวาง
        if (files.length) {
            const file = files[0]; // รับไฟล์ตัวแรก
            uploadFile(file);
        }
    });

    // จัดการการเลือกไฟล์
    newInput.addEventListener("change", () => {
        const file = newInput.files[0]; // รับไฟล์ที่ถูกเลือก
        if (file) {
            uploadFile(file);
        }
    });
}