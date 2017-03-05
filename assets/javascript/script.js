$(document).ready(function () {

    function setResults(data, searchLimit) {
        for (var item = 0; item < searchLimit; item++) {
            var currentArticle = data[item],
                itemNumber = item + 1 + ":",   
                result = $("<div>"),
                title = $("<h4>").addClass("title").text(itemNumber + " " + currentArticle.headline.main),
                snip = $("<p>").addClass("snip").text(currentArticle.lead_paragraph),
                date = $("<p>").addClass("date").text(currentArticle.pub_date),
                link = $("<a>").attr("href", currentArticle.web_url).text(currentArticle.web_url);
            
            result
                .append(title)
                .append(snip)
                .append(date)
                .append(link);
            $("#results").append(result);
        }
    }

    function getData(searchTerm, searchLimit, startDate, endDate, page) {
        var queryString = searchTerm,
            limit = searchLimit,    
            start = startDate,
            end = endDate
            page = page;
        
        if (startDate != "" || startDate == null) {
            start = "&begin_date=" + startDate;
        }

        if (endDate != "" || endDate == null) {
            end = "&end_date=" + endDate;
        }

        queryString = searchTerm;
        var apiUrl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + queryString + "&api-key=90c54821482c40c8bf03b3f3710dfede";
        $.ajax({
            url: apiUrl,
            method: "GET"
        }).done(function (data) {
            // console.log(data);
            setResults(data.response.docs, limit);
        });
    }

    $("#search").on("click", function () {
        $("#results").empty();
        var searchTerm = $("#search-term").val(),
            limit = $("#search-limit").val();    
            startYear = $("#start-year").val(),
            endYear = $("#end-year").val();
        
        getData(searchTerm, limit, startYear, endYear, 0);
    });
  
    $("#clear").on("click", function () {
        $("#results").empty();
        console.log("Clearing");
    });
});