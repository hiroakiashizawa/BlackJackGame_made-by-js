"use strict";

$(document).ready(function() {

  let Numtask = 1;

  // ☆タスク作成関連処理
  // NewTaskクリック時の処理
  $('#newTask').on('click', function (e) {
    $('#popup, #layer').show();
  })
      // ポップアップ内の処理
      // レイヤー、ポップアップのcloseボタンクリック時の処理
      $('#close, #layer').on('click', function (e) {
        $('#popup, #layer').hide();
      })

      // レイヤー submitボタンクリック時の処理
      $('#submit').on('click', function () {
        // タスクリストの最上部にポップアップのフォームに入力されたタスク情報のタスクを追加。 ## limitは未実装 ##
        $('#task_list').prepend('<li><input type="checkbox" id=task' + Numtask + '>' + $('#task_content').val() +'</li>');
        Numtask += 1
        $('ul').sortable();
      })

  // タスク修正関連処理
  // EditTaskクリック時の処理
  $('#ediTask').on('click', function (e) {
    // バリデーション
    // checked要素がなかったらエラー
    if ($('input:checked', '#task_list').length === 0) {
      alert('タスクが選択されていません');
    // checked要素が2箇所以上あったらエラー
    } else if ($('input:checked', '#task_list').length > 1) {
      alert('タスクが2箇所以上選択されています');
    } else {
      // checkedのタスクの内容をポップアップのフォームに入れる
      $('#task_content').val($('input:checked').parent('li').text());
      $('#popup, #layer').show();
    }
  })

  // チェックボックスチェック時動作
  // チェックボックス以外をクリックしてもchecked属性が付くので要修正。
  $('#task_list').on('click', 'li', function () {
    if (!$(this).prop('checked')) {
      $(this).attr('checked', true).prop('checked', true).change();
    } else {
      $(this).removeAttr('checked').prop('checked', false).change();
    }
  })

  // タスク削除処理
  $('#delTask').on('click', function (e) {
    // チェックが入ってるタスクをすべて削除
    $('input:checked').parent('li').remove();
  })
  
  // ダブルクリックでタスク完了処理
  $('#task_list').on('dblclick', 'li', function () {
    // チェックボックスを選択してもイベ発火しちゃうので要修正。
    $(this).toggleClass('comTask');
  })
  // ドラッグ＆ドロップでタスクをソート可能
  $('ul').sortable();

});




