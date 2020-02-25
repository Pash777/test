var BoxOpened="";
var ImgOpened="";
var Counter=0;
var ImgFound=0;

var Source="#boxcard"

var ImgSource=[

  "https://img0.uploadhouse.com/fileuploads/28199/281997309d4d374650c14702fdc01dd9d196aab5.png",
  "https://img0.uploadhouse.com/fileuploads/28199/281997206a86a6d06953a485f9abc8abdbb2d9b9.png",
  "https://img6.uploadhouse.com/fileuploads/28199/28199716b4fcdce7f7fea5e92ecfcf169fc84eef.png",
  "https://img3.uploadhouse.com/fileuploads/28200/282009539eb49cd51451a6c7c7cc008dac83d0cb.png",
  "https://img3.uploadhouse.com/fileuploads/28199/2819971343b2711e1cc129f675fa61e98051aa41.png",
  "https://img8.uploadhouse.com/fileuploads/28199/2819970851d681aff49490bb43380be8ccfd5637.png",
  "https://img7.uploadhouse.com/fileuploads/28199/281994877b1da0b9e87d5248b79050ec29d2376f.png",
  "https://img5.uploadhouse.com/fileuploads/28199/28199305d6bf72e3d67dcb8985f0f4c80128cf43.png",
  "https://img1.uploadhouse.com/fileuploads/28199/2819927194590d30b82518a9fa042f0a8281ff21.png",
  "https://img5.uploadhouse.com/fileuploads/28199/281992253a7dfc698c6cc024b1fd5eea8bc25ada.png"
];

// "http://img5.uploadhouse.com/fileuploads/17699/176992640c06707c66a5c0b08a2549c69745dc2c.png"


function RandomFunction(MaxValue, MinValue) {
		return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
	}
	
function ShuffleImages() {
	var ImgAll = $(Source).children();
	var ImgThis = $(Source + " div:first-child");
	var ImgArr = new Array();

	for (var i = 0; i < ImgAll.length; i++) {
		ImgArr[i] = $("#" + ImgThis.attr("id") + " img").attr("src");
		ImgThis = ImgThis.next();
	}
	
		ImgThis = $(Source + " div:first-child");
	
	for (var z = 0; z < ImgAll.length; z++) {
	var RandomNumber = RandomFunction(0, ImgArr.length - 1);

		$("#" + ImgThis.attr("id") + " img").attr("src", ImgArr[RandomNumber]);
		ImgArr.splice(RandomNumber, 1);
		ImgThis = ImgThis.next();
	}
}


function OpenCard() {
	var id = $(this).attr("id");

	if ($("#" + id + " img").is(":hidden")) {
		$(Source + " div").unbind("click", OpenCard);
	
		$("#" + id + " img").slideDown('fast');

		if (ImgOpened == "") {
			BoxOpened = id;
			ImgOpened = $("#" + id + " img").attr("src");
			setTimeout(function() {
				$(Source + " div").bind("click", OpenCard)
			}, 300);
		} else {
			CurrentOpened = $("#" + id + " img").attr("src");
			if (ImgOpened != CurrentOpened) {
				setTimeout(function() {
					$("#" + id + " img").slideUp('fast');
					$("#" + BoxOpened + " img").slideUp('fast');
					BoxOpened = "";
					ImgOpened = "";
				}, 400);
			} else {
				$("#" + id + " img").parent().css("visibility", "hidden");
				$("#" + BoxOpened + " img").parent().css("visibility", "hidden");
				ImgFound++;
				BoxOpened = "";
				ImgOpened = "";
			}
			setTimeout(function() {
				$(Source + " div").bind("click", OpenCard)
			}, 400);
		}
		Counter++;
		$("#counter").html("" + Counter);

		if (ImgFound == ImgSource.length) {
			$("#counter").prepend('<span id="success">You Found All Pictues With </span>');
		}
	}
}

$(function() {

for (var y = 1; y < 3 ; y++) {
	$.each(ImgSource, function(i, val) {
		$(Source).append("<div id=card" + y + i + "><img src=" + val + " />");
	});
}
	$(Source + " div").click(OpenCard);
	ShuffleImages();
});