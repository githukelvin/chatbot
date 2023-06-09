"use strict";

var apiKey = "af3e931af7msh969a6d607ccfbcfp138f9ajsn511cb713654e",
    openchatBot = document.querySelector("#open"),
    closechatBot = document.querySelector("#close"),
    closeChat = document.querySelector("#closeChat"),
    sendBtn = document.getElementById("sendBtn"),
    ul = document.querySelector("ul"),
    chatbot = document.querySelector(".chatbot"),
    text = document.getElementById("chatInput"),
    lang = document.querySelector("#langs"),
    souc = document.querySelector("#lans"),
    dispMessage = function dispMessage(e, t, a) {
  var l = document.createElement("li");

  if ("incoming" === t) {
    var c = document.createElement("span");
    c.innerText = "chat", c.classList.add("material-symbols-outlined"), l.appendChild(c), handlechat(t, l, e, a), ul.appendChild(l);
  } else "outcoming" === t && (handlechat(t, l, e), ul.appendChild(l));
},
    handlechat = function handlechat(e, t, a, l) {
  t.classList.add("chat", e, l);
  var c = document.createElement("p");
  c.innerHTML = a, t.appendChild(c);
},
    fetchData = function fetchData(e, t, a) {
  var l, c, s, n;
  return regeneratorRuntime.async(function fetchData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          l = {
            method: "POST",
            headers: {
              "content-type": "application/x-www-form-urlencoded",
              "X-RapidAPI-Key": apiKey,
              "X-RapidAPI-Host": "text-translator2.p.rapidapi.com"
            },
            body: new URLSearchParams({
              source_language: a,
              target_language: t,
              text: e
            })
          };
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch("https://text-translator2.p.rapidapi.com/translate", l));

        case 4:
          c = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(c.text());

        case 7:
          s = _context.sent;
          n = JSON.parse(s);
          dispMessage(n.data.translatedText, "incoming"), ul.scrollTo(0, ul.scrollHeight);
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](1);
          dispMessage("The Query failed please check Your Inputs \uD83D\uDE25\uD83D\uDE25", "incoming", "error");

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 12]]);
};

function addheigh(e) {
  e.ctrlKey && "v" === e.key ? text.style.height = "".concat(70 + text.scrollHeight, "px") : "Enter" === e.key && (text.style.height = "".concat(30 + text.scrollHeight, "px"));
}

function closed() {
  openchatBot.classList.toggle("active"), closechatBot.classList.toggle("active"), chatbot.classList.remove("active");
}

sendBtn.addEventListener("click", function () {
  var e = text.value.trim(),
      t = lang.value,
      a = souc.value;
  0 == e.length ? dispMessage("Enter a input or message", "incoming") : (dispMessage(e, "outcoming"), setTimeout(function () {
    dispMessage("Generating ...", "incoming", "gen");
    var e = document.querySelector(".gen");
    setTimeout(function () {
      e.remove();
    }, 600);
  }, 600), setTimeout(function () {
    fetchData(e, t, a);
  }, 700), text.value = "", text.style.height = "55px");
}), text.addEventListener("keydown", addheigh), openchatBot.addEventListener("click", function () {
  openchatBot.classList.add("active"), closechatBot.classList.toggle("active"), chatbot.classList.add("active");
}), closechatBot.addEventListener("click", closed), closeChat.addEventListener("click", closed);