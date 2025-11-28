function toggleAnimation($element, removeClasses, addClasses) {
  $element.removeClass(removeClasses);
  $element.addClass(addClasses);
}
export function cardHoverIn() {
  const $this = $(this);

  $this.find('.overlay').css({ opacity: "1", visibility: "visible" });
  toggleAnimation($this.find('.overlay .title'),
   'animate__slideOutLeft', 'animate__fadeInDown animate__delay-0s');
  toggleAnimation($this.find('.overlay .desc'), 
  'animate__slideOutLeft', 'animate__flipInX animate__delay-0s');
  toggleAnimation($this.find('.overlay .date'), 
  'animate__slideOutLeft', 'animate__fadeInUp animate__delay-0s');
  toggleAnimation($this.find('.overlay .rate'),
   'animate__slideOutLeft', 'animate__fadeInUp animate__delay-0s');
  $this.find('.cardImage img').addClass("animate");
}

export function cardHoverOut() {
  const $this = $(this);

  $this.find('.overlay').css({ opacity: "0", visibility: "hidden" });
  toggleAnimation($this.find('.overlay .title'),
    'animate__fadeInDown animate__delay-0s', 'animate__slideOutLeft');
  toggleAnimation($this.find('.overlay .desc'),
    'animate__flipInX animate__delay-0s', 'animate__slideOutLeft');
  toggleAnimation($this.find('.overlay .date'),
    'animate__fadeInUp animate__delay-0s', 'animate__slideOutLeft');
  toggleAnimation($this.find('.overlay .rate'),
    'animate__fadeInUp animate__delay-0s', 'animate__slideOutLeft');
  $this.find('.cardImage img').removeClass("animate");
}
