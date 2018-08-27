
/* public/script.js */

window.onload = function() {
    var converter = new showdown.Converter();
    var pad = document.getElementById('pad');
    var markdownArea = document.getElementById('markdown');   

    var previousMarkdownValue;          

    var convertTextAreaToMarkdown = function(){
        var markdownText = pad.value;
        previousMarkdownValue = markdownText;
        html = converter.makeHtml(markdownText);
        markdownArea.innerHTML = html;
    };

    var didChangeOccur = function(){
        if(previousMarkdownValue != pad.value){
            return true;
        }
        return false;
    };

    setInterval(function(){
        if(didChangeOccur()){
            convertTextAreaToMarkdown();
        }
    }, 1000);

    pad.addEventListener('input', convertTextAreaToMarkdown);
    var path = document.location.pathname.slice(1,);

    console.log("used url", path);
    
    sharejs.open(path, 'text', function(error, doc) {
        doc.attach_textarea(pad);
        convertTextAreaToMarkdown();
    });
};