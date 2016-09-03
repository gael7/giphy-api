var topics={
	cities: [
	{name: "Manchester",
	country: "England",
	},
	{name: "London",
	country: "England",
	},
	{name: "Madrid",
	country: "Spain",
	},
	{name: "Barcelona",
	country: "Spain",
	},
	{name: "Milan",
	country: "Italy",
	},
	{name: "Rome",
	country: "Italy",
	},
	{name: "Venice",
	country: "Italy",
	},
	{name: "Budapest",
	country: "Hungary",
	},
	{name: "Prague",
	country: "Czech",
	},
	{name: "Berlin",
	country: "Germany",
	},
	{name: "Amsterdam",
	country: "Holland",
	},
	{name: "Paris",
	country: "France",
	},
	],
	printButtons: function(){
		$("#citybuttons").html("");
		for (a=0; a<topics.cities.length; a++){
			$("#citybuttons").append("<a class='btn btn-danger btn-md cities' id='"+topics.cities[a].name+"'>"+topics.cities[a].name+"</a>");
		}
	},
	addingButtons: function(){
		console.log("click");
		var newCity=$('#cityToAdd').val().trim();
		var newCountry=$('#countryToAdd').val().trim();
		console.log(newCity);
		console.log(newCountry);
		topics.cities.push({name: newCity, country: newCountry });
		console.log(topics.cities);
		topics.printButtons();
	},
	printGifs: function(city, country){
	var queryURL="https://api.giphy.com/v1/gifs/search?q="+city+"+"+country+"&api_key=dc6zaTOxFJmzC&limit=100";
		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
			console.log(response);
			var ran=Math.floor(Math.random() * 8).toString();
			console.log(ran);
			var ran2=Math.floor(Math.random() * 9).toString();
			console.log(ran2);
			var ran3=parseFloat(ran+ran2);
			console.log(ran3);
			var ran4=ran3+10;
			for(i=ran3; i<ran4; i++){
				var gifDiv=$("<div class='col-lg-2 cityGif'>");
				$("#gifs").append(gifDiv);
				var rating=response.data[i].rating;
				if(rating==""){
					rating="N/A"
				}
				var p=$("<p>").html("Rating: "+rating);
				gifDiv.append(p);
				gifDiv.append("<img src='"+response.data[i].images.fixed_width_still.url+"' data-still='"+response.data[i].images.fixed_width_still.url+"' data-animate='"+response.data[i].images.fixed_width.url+"' data-state='still' class='cityGifN'>");
			}
			$('.cityGifN').on('click', function(){
			var state=$(this).data("state");
			if(state=="still"){
                var animate = $(this).data("animate")
                $(this).attr("src", animate)
                $(this).data("state", "animated")
           		} else {
               		var still = $(this).data("still")
                	$(this).attr("src", still)
                	$(this).data("state", "still")
            	}
			});
		});	
	},
	logic: function(){
		$('.cities').on('click', function(){
		var city=$(this).attr("id");
		var country;
		$("#gifs").html("");
		for (e=0; e<topics.cities.length; e++){
			if(city==topics.cities[e].name){
				country=topics.cities[e].country;
			}
		}
		console.log(city);
		console.log(country);
		topics.printGifs(city, country);
		});
	}
};

$(document).ready(function(){
	topics.printButtons();
	topics.logic();
	$('#addButton').on('click', function(){
			topics.addingButtons();
			topics.logic();
		});
});