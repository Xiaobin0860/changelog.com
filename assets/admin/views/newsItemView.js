import Sortable from "sortablejs";
import BelongsToWidget from "components/belongsToWidget";

export default class newsItemView {
  index() {
    let $queue = $(".js-queue");

    Sortable.create($queue[0], {
      draggable: "tr",
      handle: ".icon",
      onSort: function(event) {
        $.ajax({
          type: "post",
          url: `/admin/news/items/${$(event.item).data("id")}/move`,
          data: {position: event.newIndex},
          headers: {"x-csrf-token": $queue.data("csrf")}
        });
      }
    });
  }

  new() {
    new BelongsToWidget("author", "person");
    new BelongsToWidget("source", "source");
    new BelongsToWidget("sponsor", "sponsor");

    $("#news_item_sponsored").on("change", function() {
      if ($(this).is(":checked")) {
        $(".js-sponsor").show();
      } else {
        $(".js-sponsor").hide();
      }
    }).trigger("change");
  }

  edit() {
    this.new();
  }
}
