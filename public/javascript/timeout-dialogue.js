String.prototype.format = function() {
  var s = this,
      i = arguments.length;

  while (i--) {
    s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
  }
  return s;
};

!function($) {
  $.timeoutDialog = function(options) {
    console.log("Am I worth it?");

    var settings = {
      timeout: 1000,
      countdown: 60,
      title : 'Your session is about to expire!',
      message : 'You will be logged out in {30} seconds.',
      question: 'Do you want to stay signed in?',
      keep_alive_button_text: 'Yes, Keep me signed in',
      sign_out_button_text: 'No, Sign me out',
      keep_alive_url: '/keep-alive',
      logout_url: null,
      logout_redirect_url: '/',
      restart_on_yes: true,
      dialog_width: 350
    }    

    $.extend(settings, options);

    var TimeoutDialog = {
      init: function () {
        this.setupDialogTimer();
      }, 

      setupDialogTimer: function() {
        var self = this;
        window.setTimeout(function() {
           self.setupDialog();
           // 1 minute timer for notification
        }, (settings.timeout - settings.countdown) * 1000);
      },

      setupDialog: function() {
        var self = this;
        self.destroyDialog();

        $('<div id="timeout-dialog">' +
            '<p id="timeout-message">' + settings.message.format('<span id="timeout-countdown">' + settings.countdown + '</span>') + '</p>' + 
            '<p id="timeout-question">' + settings.question + '</p>' +
          '</div>')
        .appendTo('body')
        .dialog({
          modal: true,
          width: settings.dialog_width,
          minHeight: 'auto',
          zIndex: 10000,
          closeOnEscape: false,
          draggable: false,
          resizable: false,
          dialogClass: 'timeout-dialog',
          title: settings.title,
          buttons : {
            'keep-alive-button' : { 
              text: settings.keep_alive_button_text,
              id: "timeout-keep-signin-btn",
              click: function() {
                self.keepAlive();
              }
            },
            'sign-out-button' : {
              text: settings.sign_out_button_text,
              id: "timeout-sign-out-button",
              click: function() {
                self.signOut(true);
              }
            }
          }
        });

        self.startCountdown();
      },

      destroyDialog: function() {
        if ($("#timeout-dialog").length) {
          $(this).dialog("close");
          $('#timeout-dialog').remove();
        }
      },

      startCountdown: function() {
        var self = this,
            counter = settings.countdown;

        this.countdown = window.setInterval(function() {
          counter -= 1;
          $("#timeout-countdown").html(counter);

          if (counter <= 0) {
            window.clearInterval(self.countdown);
            self.signOut(false);
          }
          //30 second timer for them to choose if they will remain logged in or it will log them out for making no choice
        }, 30000);
      },

      keepAlive: function() {
        var self = this;
        this.destroyDialog();
        window.clearInterval(this.countdown);

        $.get(settings.keep_alive_url, function(data) {
          if (data == "OK") {
            if (settings.restart_on_yes) {
              self.setupDialogTimer();
            }
          }
          else {
            self.signOut(false);
          }
        });
      },

      signOut: function(is_forced) {
        var self = this;
        this.destroyDialog();

        if (settings.logout_url != null) {
            $.post(settings.logout_url, function(_data){
                self.redirectLogout(is_forced);
            });
        }
        else {
            self.redirectLogout(is_forced);
        }
      }, 

      redirectLogout: function(is_forced){
        var target = settings.logout_redirect_url + '?next=' + encodeURIComponent(window.location.pathname + window.location.search);
        if (!is_forced)
          target += '&timeout=t';
        window.location = target;
      }
    };

    TimeoutDialog.init();
  };
}(window.jQuery);