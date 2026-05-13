/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação da camada model de Clubes (Controller)
 * Projeto: ConectaBook
 * Data: 06/05/2026
 * Autor: Geovanna Silva
 * Versão: 1.1
 *******************************************************************************************/

const clubeDAO = require("../../model/DAO/clube.js");
const messages = require("../modulo/config_messages.js");


// const { listarUsuarioID } = require("../usuario/usuario_controller.js");

// GET - Listar todos os clubes
const listarClubes = async function () {
    try {
        //No Controller (listarClubes)
let result = await clubeDAO.getSelectAllClubs();

if(result) {
    let responseData = Object.assign({}, messages.HEADER);
    responseData.status = messages.SUCCESS_REQUEST.status;
    responseData.status_code = messages.SUCCESS_REQUEST.status_code;
    // IMPORTANTE: result já é o array limpo vindo do DAO agora
    responseData.response = result; 
    return responseData;
} else {
    // Se o banco estiver vazio ou o DAO retornar false, cai aqui
    return messages.ERROR_NOT_FOUND;
}
    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
    
}

// GET id - Listar clubes pelo ID
const listarClubeID = async function (id) {
    if (id == '' || id == undefined || isNaN(id)) {
        return messages.ERROR_REQUIRED_FIELDS;
    }

    try{
        let result = await clubeDAO.getSelectByIdClub(id);

        if(result) {
           let responseData = Object.assign({}, messages.HEADER);
           responseData.status = messages.SUCCESS_REQUEST.status;
           responseData.status_code = messages.SUCCESS_REQUEST.status_code;
            // O DAO já retorna o array de dados filtrado, pela a primeira posição
            responseData.response = result[0]; 
            return responseData;
} else {
                   return messages.ERROR_NOT_FOUND;
}
    } catch (error) {
               return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}


//  POST - Criar novo clube
const criarClube = async function (clube, contentType) {
    try {
        if (String(contentType).toLowerCase() !== 'application/json') {
            return messages.ERROR_CONTENT_TYPE
        }

        if(clube.nome == '' || clube.nome == undefined || 
           clube.sobre == '' || clube.sobre == undefined ||
           clube.regras == ''|| clube.regras == undefined ||
           clube.foto == '' || clube.foto == undefined ||
           clube.id_membros == '' || clube.id_membros == undefined ||
           clube.id_genero == '' || clube.id_genero == undefined 
        ) {
            return messages.ERROR_REQUIRED_FIELDS
        } else {
            let result = await clubeDAO.setInsertClub(clube);

            if(result) {
                let responseData = Object.assign({}, messages.HEADER);
                responseData.status = messages.SUCCESS_CREATED_ITEM.status;
                responseData.status_code = messages.SUCCESS_CREATED_ITEM.status_code;
                responseData.response = messages.SUCCESS_CREATED_ITEM.message;
                return responseData;
            } else {
                return messages.ERROR_INTERNAL_SERVER_MODEL;
            }
        }
    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
}


// PUT - Atualizar clube 
const atualizarClube = async function (clube, contentType, id) {
  try {
         if (id == '' || id == undefined || isNaN(id)) {
             return messages.ERROR_REQUIRED_FIELDS;
         }
 
         if (String(contentType).toLowerCase() !== 'application/json') {
             return messages.ERROR_CONTENT_TYPE;
         }

         if(clube.nome == '' || clube.nome == undefined || 
           clube.sobre == '' || clube.sobre == undefined ||
           clube.regras == ''|| clube.regras == undefined ||
           clube.foto == '' || clube.foto == undefined ||
           clube.id_membros == '' || clube.id_membros == undefined ||
           clube.id_genero == '' || clube.id_genero == undefined 
        ) {
            return messages.ERROR_REQUIRED_FIELDS;
        } else {
            let buscarId = await clubeDAO.getSelectByIdClub(id);

            if(buscarId) {
                clube.id = id;
                let result = await clubeDAO.setUpdateClub(clube);
                
                if(result) {
                    let responseData = Object.assign({}, messages.HEADER);
                    responseData.status = messages.SUCCESS_UPDATED_ITEM.status;
                    responseData.status_code = messages.SUCCESS_UPDATED_ITEM.status_code;
                    responseData.response = messages.SUCCESS_UPDATED_ITEM.message;
                    return responseData;
                } else {
                    return messages.ERROR_INTERNAL_SERVER_MODEL;
                }
            } else {
                return messages.ERROR_NOT_FOUND;
            }
        }
        
        } catch(error) {
            return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
        }
}


// DELETE - Excluir clube
const excluirClube = async function (id) {
    if (id == ''|| id == undefined || isNaN(id)) {
        return messages.ERROR_REQUIRED_FIELDS;
    }

    try{
        let buscarId = await clubeDAO.getSelectByIdClub(id);

        if(buscarId) {
            let result = await clubeDAO.setDeleteClub(id);

            if(result) {
                let responseData = Object.assign({}, messages.HEADER);
                responseData.status = messages.SUCCESS_DELETE_ITEM.status;
                responseData.status_code = messages.SUCCESS_DELETE_ITEM.message;
                return responseData;
            } else {
                return messages.ERROR_INTERNAL_SERVER_MODEL;
            }
        } else {
            return messages.ERROR_NOT_FOUND;
        }
    } catch (error) {
        return messages.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
    
}


module.exports = {
    listarClubeID,
    listarClubes,
    excluirClube,
    atualizarClube,
    criarClube
}