define(['explore/circle', 'createjs'], function (Circle, createjs) {
  'use strict';

  var Issue = function (index) {
    this._index = index;

    return this;
  };

  Issue.prototype = new Circle();

  Issue.prototype._superSetData = Issue.prototype.setData;
  Issue.prototype.setData = function (data) {
    this._superSetData.bind(this)(data);

    var colors = [0x00ae52, 0xffcc00, 0xe11313];
    this.color = colors[this.data._status];
  };

  Issue.prototype._superDraw = Issue.prototype.draw;
  /**
   * Draws an issue circle
   * @param  {number} radius desired radius
   * @param  {number} x x position
   * @param  {number} y y position
   */
  Issue.prototype.draw = function (radius, x, y) {
    this._superDraw.bind(this)(radius, x, y);
    this.elm.interactive = true;
    this.elm.buttonMode = true;
    this.elm.index = this._index;

    this.related = [Math.floor(Math.random() * 30)];
  };

  Issue.prototype._superMouseOver = Issue.prototype.mouseOver;
  /**
   * Sets mouse over
   */
  Issue.prototype.mouseOver = function () {
    Issue.prototype._superMouseOver.bind(this)();
    this.elm.addChild(this._title);
    this._circle.tint = this.color;
    createjs.Tween.get(this._circle).to({tint: 0xFF0000});
  };

  /**
   * animation tick
   * @param  {Point} mousePosition current mouse position
   */
  Issue.prototype.update = function (mousePosition) {
    if (this.isOver) {
      this.elm.x = mousePosition.x;
      this.elm.y = mousePosition.y;

      var stickyRadius = 50;
      if (Math.abs(this.elm.x - this._x0) > stickyRadius ||
          Math.abs(this.elm.y - this._y0) > stickyRadius) {
        this.elm.removeChild(this._title);
        this.isOver = false;
        createjs.Tween.get(this.elm, {override: true})
        .to({x: this._x0, y: this._y0}, 500, createjs.Ease.getBackOut(2.5))
        .call(this._resumeStaticAnimation.bind(this));
      }
    }
    // this.elm.aplha = isOver && !circle.isOver ? 0.5 : 1;
  };

  return Issue;
});