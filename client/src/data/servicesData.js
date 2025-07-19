const servicesData = [
    {
        id: 1,
        name: "Microwave Repair",
        price: 499,
        image: "https://5.imimg.com/data5/SELLER/Default/2021/4/YK/DV/CM/127247163/microwave-oven-repair-services-500x500.jpg",
        category: "Appliance Repair"
    },
    {
        id: 2,
        name: "Plumbing Service",
        price: 499,
        image: "https://5.imimg.com/data5/SELLER/Default/2023/4/301270031/RO/MJ/HW/55834732/plumber-service.jpg",
        category: "Appliance Repair"
    },
    {
        id: 3,
        name: "Women's Haircut",
        price: 299,
        image: "https://5.imimg.com/data5/SELLER/Default/2024/9/448175395/OV/BY/SM/155214355/women-hair-cutting-service-500x500.jpg",
        category: "Salon"
    },
    {
        id: 4,
        name: "Bike Servicing",
        price: 499,
        image: "https://3.imimg.com/data3/BR/KG/MY-13797159/indian-bike-servicing-500x500.jpg",
        category: "Automobile"
    },
    {
        id: 5,
        name: "Wall Painting",
        price: 799,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7F3HHKLK60yJfXsnkP2V2wArlDyVFFS0riQ&s",
        category: "Home Service"
    },
    {
        id: 6,
        name: "CCTV Installation",
        price: 1499,
        image: "https://img2.exportersindia.com/product_images/bc-small/2020/1/5469725/cctv-installation-services-1579521447-5261944.jpeg",
        category: "Appliance Installation"
    },
    {
        id: 7,
        name: "Bathroom Cleaning",
        price: 349,
        image: "https://5.imimg.com/data5/SELLER/Default/2022/10/JI/XE/RL/160890546/bathroom-cleaning-service.jpeg",
        category: "Cleaning"
    },
    {
        id: 8,
        name: "AC Servicing",
        price: 699,
        image: "https://content.jdmagicbox.com/comp/def_content_category/ac-repair-and-services-crystal/360-f-288995585-4gmh9yorrie0zisc8dtqnl3d4dbhgeka-ac-repair-and-services-crystal-14-lv84l.jpg",
        category: "Appliance Repair"
    },
    {
        id: 9,
        name: "Birthday Decoration",
        price: 999,
        image: "https://rukminim3.flixcart.com/image/850/1000/xif0q/birthday-combo/w/j/i/multipastel-theme-birthday-decorations-kit-with-white-curtains-original-imaggg3rkhdgpagt.jpeg?q=90&crop=false",
        category: "Event"
    },
    {
        id: 10,
        name: "Electrician Visit",
        price: 299,
        image: "https://allservices4u.co.uk/app/uploads/2024/04/AdobeStock_658718835_800.jpg",
        category: "Appliance Repair"
    },
    {
        id: 11,
        name: "Home Deep Cleaning",
        price: 999,
        image: "https://www.hourmaid.com/wp-content/uploads/2019/01/deep-clean.jpeg",
        category: "Cleaning"
    },
    {
        id: 12,
        name: "Refrigerator Repair",
        price: 749,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf_Z28OxLHT7x8NAzIC091xtnMmmq9wwfAHw&s",
        category: "Appliance Repair"
    },
    {
        id: 13,
        name: "Facial & Cleanup",
        price: 499,
        image: "https://skinkraft.com/cdn/shop/articles/Facial-Versus-Clean-up_1024x1024.jpg?v=1593155930",
        category: "Salon"
    },
    {
        id: 14,
        name: "Manicure & Pedicure",
        price: 399,
        image: "https://d2p5rd30inmhrb.cloudfront.net/fe/Blogs-VLCC/core-blogs/30/1.jpeg",
        category: "Salon"
    },
    {
        id: 15,
        name: "Event Photographer",
        price: 1499,
        image: "https://perfocal-assets.lon1.cdn.digitaloceanspaces.com/jumpstart/img/heros/hero-4.jpg",
        category: "Event"
    },
    {
        id: 16,
        name: "TV Installation",
        price: 399,
        image: "https://5.imimg.com/data5/LF/OC/ZH/ANDROID-79537570/product-jpeg-500x500.jpg",
        category: "Appliance Installation"
    },
    {
        id: 17,
        name: "Ceiling Fan Installation",
        price: 349,
        image: "https://files.cdn-files-a.com/uploads/2711912/normal_6680ef1f60c25.jpg",
        category: "Appliance Installation"
    },
    {
        id: 18,
        name: "Sofa Cleaning",
        price: 599,
        image: "https://www.homecaresolutions.in/assets/images/choose/sofa.jpg",
        category: "Cleaning"
    },
    {
        id: 19,
        name: "Door Lock Repair",
        price: 249,
        image: "https://5.imimg.com/data5/SELLER/Default/2023/11/357899799/WW/OI/XC/15518016/door-lock-repairing.jpeg",
        category: "Appliance Repair"
    },
    {
        id: 20,
        name: "Kitchen Cleaning",
        price: 449,
        image: "https://cleanfanatics.in/wp-content/uploads/2023/07/woman-holding-rag-detergent-cleaning-cooker-1-1024x683.jpg",
        category: "Cleaning"
    },
    {
        id: 21,
        name: "Full Car Cleaning",
        price: 799,
        image: "https://cdn.shopify.com/s/files/1/0554/2078/0622/files/car-cleaning-tips-1024x682.jpg",
        category: "Automobile"
    },
    {
        id: 22,
        name: "Home Sanitization",
        price: 499,
        image: "https://cpimg.tistatic.com/07486533/b/4/Home-Sanitization-Service.jpg",
        category: "Home Service"
    },
    {
        id: 23,
        name: "Men's Haircut",
        price: 199,
        image: "https://atozservice.in/api/storage/4353/mens-salon.jpg",
        category: "Salon"
    },
    {
        id: 24,
        name: "Makeup Artist",
        price: 1299,
        image: "https://cdn-eaekd.nitrocdn.com/CxTeoSPKdjdqTSxLEEGaKiGroHlKASqH/assets/images/optimized/rev-3b85d41/cleverharvey.com/wp-content/uploads/2023/10/preparation-hairdresser-makeup-artist_329181-1935.jpg",
        category: "Salon"
    },
    {
        id: 25,
        name: "Curtain Cleaning",
        price: 399,
        image: "https://homepluscleaning.com/media/images/How-to-Clean-Curtains-and-Drapes.jpg",
        category: "Cleaning"
    },
    {
        id: 26,
        name: "Pest Control",
        price: 799,
        image: "https://www.radheshyampestcontrol.com/wp-content/uploads/2023/04/Commercial-and-Residential-Pest-control-UT-hybridpestcontrol-scaled-1.jpeg",
        category: "Home Service"
    },
    {
        id: 27,
        name: "Washing Machine Repair",
        price: 649,
        image: "https://5.imimg.com/data5/SELLER/Default/2024/6/429728115/DU/YX/WS/222439567/washing-machine-repair-services.jpeg",
        category: "Appliance Repair"
    },
    {
        id: 28,
        name: "Carpenter Work",
        price: 399,
        image: "https://5.imimg.com/data5/SELLER/Default/2024/1/381655494/QE/IQ/QE/155969258/home-carpenter-services.jpeg",
        category: "Home Service"
    },
    {
        id: 29,
        name: "Carpet Cleaning",
        price: 299,
        image: "https://www.sophistimom.com/wp-content/uploads/2024/05/Carpet-Cleaning-new.jpeg",
        category: "Cleaning"
    },
    {
        id: 30,
        name: "Full Body Massage",
        price: 899,
        image: "https://atmabodhwellness.com/wp-content/uploads/2023/12/Full-Body-Massage-Therapies.jpg",
        category: "Salon"
    }
];

export default servicesData;