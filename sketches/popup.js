function showPopup() {
  document.querySelector('#popup').classList.remove('hide');
}

function closePopup() {
  document.querySelector('#popup').classList.add('hide');
}

// 외부영역 클릭 시 팝업 닫기
$(document).mouseup(function (e) {
  var popContent = $('#popup');
  if (popContent.has(e.target).length === 0) {
    popup.classList.add('hide');
  }
});

// 팝업 코드 참고
