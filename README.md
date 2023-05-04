# Projeto-Web-Full-Stack

# 1) Descição do Projeto
A avaliacao de suficiencia da disciplina de Programacao Web Fullstack sera realizada por meio
da implementacao de um projeto de aplicacao web. O projeto considera o desenvolvimento de
uma aplicacao web em 4 camadas: Front-end, Back-end, Servico de Escrita e Banco de dados.
Os alunos devem implementar individualmente o projeto e a entrega deve ser realizada ate o
dia 10 de maio de 2023 (quarta-feira).

#2) Requisitos funcionais
O projeto deve implementar os seguintes requisitos funcionais:
1. Cadastro de usudrios;
2. Login de usuarios;
3. Busca de usuarios.
Apenas usuarios com sessao ativa no sistema (logados) podem cadastrar novos usuérios e
realizar busca de usuarios.

#3) Arquitetura do sistema

O sistema deve ser implementado com 4 camadas, conforme ilustrado na Figura 1.
A seguir, sao detalhados requisitos técnicos, considerando cada camada do sistema:

# Front-end :
deve ser implementado utilizando a biblioteca de front-end React.js. Toda a
comunica¢gao com o Back-end deve ser realizada por meio de requisicdes HTTP, carac-
terizando uma Single-Page Application - SPA;

# Back-end :
deve ser implementado utilizando Express.js. A comunicagéo com o Front-end
deve seguir o padrao de rotas Restful. Esse servidor tera acesso direto ao banco de dados
apenas para leitura. Os processos de escrita devem ser realizados por meio do servico de
escrita no banco de dados. Esse servidor também deve implementar um sistema de cache
de rotas, utilizando o sistema REDIS;

![image](https://user-images.githubusercontent.com/107415162/236101193-ca93e64d-621f-4d24-8e57-911620616988.png)

# Servico de escrita :
deve ser implementado com Node.js, tera acesso direto ao banco de dados,
e a comunicagdo com os outros servicos deve ser realizada por meio de sistema de filas
de mensagens ou fluxo de eventos;

# Banco de dados:
pode ser utilizado qualquer sistema de gerenciamento de banco de dados
da escolha dos alunos.

#4) Critérios de avaliacao

Qualquer biblioteca utilizada nao aprovada previamente pelo professor seré desconsiderada
da avaliacao. Se for constatada cépia de artefatos de outros projetos, sera atribuida nota zero.

Os critérios de avaliacgado desse projeto sao definidos a seguir:

* Implementagao dos requisitos funcionais do sistema.
* Implementacao da arquitetura proposta.
* Verificagdo de preenchimento de campos.
* Apresentacao de mensagens de erro de validacdo de todas as operacGes do sistema nas
* camadas de Front-end e Back-end.
* Implementagao da estratégia de cache no Back-end.
* Validacao de sessao/token de autenticagao.
Implementagao de regras de seguranca para a aplicacao.
