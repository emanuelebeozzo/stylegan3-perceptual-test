/* var slider = document.getElementById("sliderInput");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
}
 */
var valueBubble = '<output class="rangeslider__value-bubble" style="pointer-events: none;"/>';


function updateValueBubble(pos, value, context) {
  pos = pos || context.position;
  value = value || context.value;
  var $valueBubble = $('.rangeslider__value-bubble', context.$range);
  var tempPosition = pos + context.grabPos;
  var position = (tempPosition <= context.handleDimension) ? context.handleDimension : (tempPosition >= context.maxHandlePos) ? context.maxHandlePos : tempPosition;

  if ($valueBubble.length) {
    $valueBubble[0].style.left = Math.ceil(position) + 'px';
    $valueBubble[0].innerHTML = value;
  }
}

$('input[type="range"]').rangeslider({
  polyfill: false,
  onInit: function() {
    this.$range.append($(valueBubble));
    updateValueBubble(null, null, this);
  },
  onSlide: function(pos, value) {
    updateValueBubble(pos, value, this);
  }
});