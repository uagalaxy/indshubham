      var  date = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"),
            monthname = new Array("Jan", "Feb", "Mar", "Apr", "Mar", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"),
            today = new Date,
            i = today.getYear();
          1e3 > i && (i += 1900);
        var day = today.getDay(),
            month = today.getMonth(),
            s = today.getDate();
document.querySelector('#postdate').value = monthname[month] + " " + s + ", " + i;

    const 
app = document.getElementById('app'),
tabLinks = document.querySelectorAll('.au-nav-list a'),
navBox = document.querySelector('.au-nav-box'),
navbtn = document.querySelector('#navigation');



tabLinks.forEach(function(e){
   e.onclick = function(){
      navbtn.checked = false
   }
})
app.addEventListener("touchstart", function(){
   navbtn.checked = false
})
//====================================================================================================

function upload(){
    //get your image
    var image=document.getElementById('image').files[0];
    //get your blog text
    var posttitle=document.getElementById('posttitle').value;
    var postdesc=document.getElementById('postdesc').value;
    var postdate=document.getElementById('postdate').value;
    //get image name
    var imageName=image.name;
    //firebase storage reference
    //it is the path where your image will be stored
    var storageRef=firebase.storage().ref('images/'+imageName);
    //upload image to selected storage reference
    //make sure you pass image here
    var uploadTask=storageRef.put(image);
    uploadTask.on('state_changed',function(snapshot){
         var progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
         console.log("upload is "+progress+" done");
    },function(error){
      console.log(error.message);
    },function(){
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
           firebase.database().ref('blogs/').push().set({
                 title:posttitle,
                 desc:postdesc,
                 date:postdate,
                 imageURL:downloadURL
           },function(error){
               if(error){
                   alert("Error while uploading");
               }else{
                   alert("Successfully uploaded");
                   document.getElementById('post-form').reset();
                   getdata();
               }
           });
        });
    });

}

window.onload=function(){
    this.getdata();
}


function getdata(){
    firebase.database().ref('blogs/').once('value').then(function(snapshot){
      //get your posts div
      var posts_div=document.getElementById('post');
      //remove all remaining data in that div
      posts_div.innerHTML="";
      //get data from firebase
      var data=snapshot.val();
      console.log(data);
      //now pass this data to our posts div
      //we have to pass our data to for loop to get one by one
      //we are passing the key of that post to delete it from database
      for(let[key,value] of Object.entries(data)){
        posts_div.innerHTML=
        "<div class='au-post-card'>"+
          "<div class='post-img-holder'>"+
              "<embed class='post-img image' src='"+value.imageURL+"'>"+
          "</div>"+
          "<a class='post-download' href='"+value.imageURL+"' download='ind-shubham@uagalaxy'><svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 512 512'><path d='M336,176h40a40,40,0,0,1,40,40V424a40,40,0,0,1-40,40H136a40,40,0,0,1-40-40V216a40,40,0,0,1,40-40h40' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><polyline points='176 272 256 352 336 272' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='256' y1='48' x2='256' y2='336' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/></svg></a>"+
          "<div class='post-about'>"+
              "<span class='post-title'>"+value.title+"</span>"+
              "<p class='post-desc'>"+value.desc+"</p>"+
          "</div>"+
          "<div class='post-user'>"+
                "<img class='post-user-img image' src='assets/img/shubham.jpg' alt='ind.shubham'>"+
                "<span class='user-name-date'>"+
                   "<a href='index.html' class='post-user-name'>ind.shubham</a>"+
                   "<span class='post-date'>"+value.date+"</span>"+
                "</span>"+
          "</div>"+
          "<button class='post-delete-btn hide' id='"+key+"' onclick='delete_post(this.id)'>Delete <svg xmlns='http://www.w3.org/2000/svg' width='20px' height='20px' viewBox='0 0 512 512'><rect x='32' y='48' width='448' height='80' rx='32' ry='32'/><path d='M74.45,160a8,8,0,0,0-8,8.83L92.76,421.39a1.5,1.5,0,0,0,0,.22A48,48,0,0,0,140.45,464H371.54a48,48,0,0,0,47.67-42.39l0-.21,26.27-252.57a8,8,0,0,0-8-8.83ZM323.31,340.69a16,16,0,1,1-22.63,22.62L256,318.63l-44.69,44.68a16,16,0,0,1-22.63-22.62L233.37,296l-44.69-44.69a16,16,0,0,1,22.63-22.62L256,273.37l44.68-44.68a16,16,0,0,1,22.63,22.62L278.62,296Z'/></svg></button>"+
      "</div>"+posts_div.innerHTML;
      }

   firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        document.querySelectorAll(".post-delete-btn").forEach((bgs)=>{bgs.classList.remove("hide")})
    }
    })

/*=========================================================*/
     document.querySelectorAll(".post-img-holder").forEach((e) => {
    let bgimg = e.querySelector("embed").getAttribute("src")
    e.querySelector("embed").setAttribute("style", "backdrop-filter: blur(10px) brightness(90%);")
    e.setAttribute("style","background:url("+bgimg+");background-size: contain;");
     return this;  }); 

let image = document.querySelectorAll(".image"),
previewBox = document.querySelector(".preview-box"),
previewimg = previewBox.querySelector("embed");
      for(let i = 0; i < image.length; i++){
    image[i].onclick = () =>{
      let dataimage = image[i].getAttribute("src");
      previewimg.setAttribute("src", dataimage);
      previewBox.classList.add('show');
      previewBox.classList.remove('hide');
      document.querySelector(".close").classList.add('show');
      document.querySelector(".close").classList.remove('hide');
    }
}
document.querySelector(".close").onclick = ()=>{
    document.querySelector(".close").classList.remove('show');
    document.querySelector(".close").classList.add('hide');
    previewBox.classList.add('hide');
    previewBox.classList.remove('show');
} 
/*===========================================*/
});

}

function delete_post(key){
    firebase.database().ref('blogs/'+key).remove();
    getdata();
}

firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        document.querySelector(".goforpost").style.display = "block";
        document.querySelector(".logout").style.display = "block";
    }
})
function logout(){
    firebase.auth().signOut();
    navbtn.checked = false;
    location.replace("blog.html")
}