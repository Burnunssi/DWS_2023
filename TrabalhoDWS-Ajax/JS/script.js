$(document).ready(function () {
    ler();
    validar();
});

function preencher(dados) {
    $("#bodyTabela").empty();
    $.each(dados, function (i, obj) {
        var row =
            "<tr><td>" +
            obj.nome +
            "</td><td>" +
            obj.email +
            '</td><td><button onclick="remover(' +
            obj.id +
            ')" type="button" class="btn btn-danger">Excluir</button></td></tr>';
        $("#bodyTabela").append(row);
    });
}

function ler() {
    $("#myForm").find("input").removeClass("is-valid");

    $.ajax({
        type: "POST",
        url: "https://epansani.com.br/2023/dw1s4/ajax/list.php",
        async: true,
        data: {},
        success: function (data) {
            const dados = JSON.parse(data);
            preencher(dados);
        }
    });
}

function validar() {
    $("#myForm").on("input", "input", function (event) {
        var elemento = $(event.target);
        var isValid = elemento[0].checkValidity();

        if (isValid) {
            elemento.removeClass("is-invalid").addClass("is-valid");
        } else {
            elemento.removeClass("is-valid").addClass("is-invalid");
        }
    });
}

function inserir() {
    validar();
    var flag = true;
    $("#myForm")
        .find("input")
        .each(function () {
            if ($(this).hasClass("is-invalid") || !$(this).val()) {
                flag = false;
                return false;
            }
        });

    if (flag) {
        insert();
    }
}

function insert() {
    $.ajax({
        type: "POST",
        url: "https://epansani.com.br/2023/dw1s4/ajax/ins.php",
        async: true,
        data: {
            nome: $("#nome").val(),
            email: $("#email").val(),
        },
        success: function (data) {
            if (data) {
                $("#myForm")[0].reset();
                ler();
            }
        }
    });
}

function remover(id) {
    var isConfirm = confirm("Deseja mesmo remover os dados?");
    if (isConfirm) {
        $.ajax({
            type: "POST",
            url: "https://epansani.com.br/2023/dw1s4/ajax/rem.php",
            async: true,
            data: {
                id: id,
            },
        });
    }
}
