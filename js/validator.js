Validator("#form-1");
function Validator(formSelection) {
  var _this = this;
  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }
  var formRules = {};
  var validatorRules = {
    required: function (value) {
      return value ? undefined : "Không để trống!";
    },
    email: function (value) {
      const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      return re.test(value) ? undefined : "Vui lòng nhập đúng email!";
    },
    min: function (min) {
      return function (value) {
        return value.length >= min ? undefined : `Nhập ít nhất ${min} kí tự`;
      };
    },
    max: function (max) {
      return function (value) {
        return value.length <= max ? undefined : `Nhập nhiều nhất ${max} kí tự`;
      };
    },
    password: function (value) {
      return value ? console.log(value) : ``;
    },
    confirmPassword: function (value) {
      return value === this.password.value
        ? undefined
        : `Vui lòng nhập đúng mật khẩu`;
    },
  };
  //lấy ra form element trong dom theo form
  var formElement = document.querySelector(formSelection);
  //có form mới xử lý tiếp
  if (formElement) {
    var inputs = formElement.querySelectorAll("[name][rules]");

    for (var input of inputs) {
      var rules = input.getAttribute("rules").split("|");
      for (var rule of rules) {
        var ruleInfo;
        var isRuleHasValue = rule.includes(":");
        if (isRuleHasValue) {
          var ruleInfo = rule.split(":");
          rule = ruleInfo[0];
        }
        var ruleFunc = validatorRules[rule];
        if (isRuleHasValue) {
          ruleFunc = ruleFunc(ruleInfo[1]);
        }
        if (Array.isArray(formRules[input.name])) {
          formRules[input.name].push(ruleFunc);
        } else {
          formRules[input.name] = [ruleFunc];
        }
      }
      input.onblur = handleValidate;
      input.oninput = handleClearError;
    }
    //hàm thực hiện validate
    function handleValidate(event) {
      var rules = formRules[event.target.name];
      var errorMessage;
      for (var rule of rules) {
        errorMessage = rule(event.target.value);
        if (errorMessage) break;
      }

      if (errorMessage) {
        var formGroup = getParent(event.target, ".form-group");
        if (formGroup) {
          formGroup.classList.add("invalid");
          var formMessage = formGroup.querySelector(".form-message");
          if (formMessage) {
            formMessage.innerText = errorMessage;
          }
        }
      }
      return !errorMessage;
    }
  }
  function handleClearError(event) {
    var formGroup = getParent(event.target, ".form-group");
    if (formGroup.classList.contains("invalid")) {
      formGroup.classList.remove("invalid");
      var formMessage = formGroup.querySelector(".form-message");
      if (formMessage) {
        formMessage.innerText = "";
      }
    }
  }
  formElement.onsubmit = function (event) {
    event.preventDefault();

    var inputs = formElement.querySelectorAll("[name][rules]");
    var isValid = true;
    for (var input of inputs) {
      if (
        !handleValidate({
          target: input,
        })
      ) {
        isValid = false;
      }
    }

    if (isValid) {
      if (typeof _this.onSubmit === "function") {
        var enableInputs = formElement.querySelectorAll("[name]");
        var formValues = Array.from(enableInputs).reduce(function (
          values,
          input
        ) {
          switch (input.type) {
            case "radio":
              values[input.name] = formElement.querySelector(
                'input[name="' + input.name + '"]:checked'
              ).value;
              break;
            case "checkbox":
              if (!input.matches(":checked")) {
                values[input.name] = "";
                return values;
              }
              if (!Array.isArray(values[input.name])) {
                values[input.name] = [];
              }
              values[input.name].push(input.value);
              break;
            case "file":
              values[input.name] = input.files;
              break;
            default:
              values[input.name] = input.value;
          }

          return values;
        },
          {});

        _this.onSubmit(formValues);
      } else {
        formElement.submit();
      }
    }
  };
}
