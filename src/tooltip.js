function floatingTooltip(tooltipId, width) {
  var t = d3.select('body')
    .append('div')
    .attr('class', 'tooltip')
    .attr('id', tooltipId)
    .style('pointer-events', 'none');

  if (width) {
    t.style('width', width);
  }

  hideTooltip();

  function showTooltip(content, event) {
    d3.select('#' + tooltipId)
      .style('opacity', 1.0)
      .html(content);

    updatePosition(event);
  }

  function hideTooltip() {
    d3.select('#' + tooltipId)
      .style('opacity', 0.0);
  }

  function updatePosition(event) {
    var xOffset = 20;
    var yOffset = 10;

    var ttw = t.style('width');
    var tth = t.style('height');

    var wscrY = window.scrollY;
    var wscrX = window.scrollX;

    var curX = (document.all) ? event.clientX + wscrX : event.pageX;
    var curY = (document.all) ? event.clientY + wscrY : event.pageY;
    var ttleft = ((curX - wscrX + xOffset * 2 + ttw) > window.innerWidth) ?
                 curX - ttw - xOffset * 2 : curX + xOffset;

    if (ttleft < wscrX + xOffset) {
      ttleft = wscrX + xOffset;
    }

    var tttop = ((curY - wscrY + yOffset * 2 + tth) > window.innerHeight) ?
                curY - tth - yOffset * 2 : curY + yOffset;

    if (tttop < wscrY + yOffset) {
      tttop = curY + yOffset;
    }

    // $(ttid).css('top', tttop + 'px').css('left', ttleft + 'px');
    t.style({ top: tttop + 'px', left: ttleft + 'px' });
  }

  return {
    showTooltip: showTooltip,
    hideTooltip: hideTooltip,
    updatePosition: updatePosition
  };
}
