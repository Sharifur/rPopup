# rPopup
light wet image and video popup plugin


 #load rPopup css
 <pre>
"dist/css/rpopup.min.css"
</pre>

#load rPopup js
<pre>
 <script src="dist/js/jquery.rPopup.min.js"></script>
</pre>
#load rPopup js
<pre>
 <script src="dist/js/jquery.rPopup.min.js"></script>
</pre>
    
#if you don't have jquery script than use like below order    
<pre>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-migrate/3.1.0/jquery-migrate.min.js"></script>
 <script src="dist/js/jquery.rPopup.min.js"></script>
</pre>

#activate image popup using Rpopup
<pre>
$('.className').rPopup({ 'image': true });
</pre>

#activate youtube video popup using Rpopup
<pre>
$('.className').rPopup({ 'video': { embed: true, autoplay: true, }, });
</pre>

#activate hosted video popup using Rpopup
<pre>
$('.className').rPopup({ 'video': { embed: true, autoplay: true, }, });
</pre>
