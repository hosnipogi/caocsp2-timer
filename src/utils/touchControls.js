export default function touch(ref, func, deltaMin = 90) {
  const swipe_det = {
    sX: 0,
    sY: 0,
    eX: 0,
    eY: 0,
  };
  // Directions enumeration
  const directions = Object.freeze({
    UP: 'up',
    DOWN: 'down',
    RIGHT: 'right',
    LEFT: 'left',
  });
  let direction = null;

  ref.addEventListener(
    'touchstart',
    function(e) {
      const t = e.touches[0];
      swipe_det.sX = t.screenX;
      swipe_det.sY = t.screenY;
    },
    false
  );
  ref.addEventListener(
    'touchmove',
    function(e) {
      // Prevent default will stop user from scrolling, use with care
      e.preventDefault();
      const t = e.touches[0];
      swipe_det.eX = t.screenX;
      swipe_det.eY = t.screenY;
    },
    false
  );
  ref.addEventListener(
    'touchend',
    function() {
      const deltaX = swipe_det.eX - swipe_det.sX;
      const deltaY = swipe_det.eY - swipe_det.sY;
      const tapOnly = !swipe_det.eX && !swipe_det.eY ? true : false;

      // Min swipe distance, you could use absolute value rather
      // than square. It just felt better for personnal use
      if (deltaX ** 2 + deltaY ** 2 < deltaMin ** 2) return;
      // horizontal
      if (deltaY === 0 || Math.abs(deltaX / deltaY) > 1)
        direction = deltaX > 0 ? directions.RIGHT : directions.LEFT;
      // vertical
      else direction = deltaY > 0 ? directions.UP : directions.DOWN;

      if (direction && typeof func === 'function') func(direction, tapOnly);

      direction = null;
      swipe_det.eX = 0;
      swipe_det.eY = 0;
    },
    false
  );
}
