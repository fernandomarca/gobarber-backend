# Recuperação de senha

**RF**

[x] O user deve poder recuperar sua senha informando o seu e-mail;
[x] O user deve receber um e-mail com instruções de recuperação de senha;
[x] O user deve poder resetar sua senha;

**RNF**

[x] Utilizar MailTrap para testar envio de e-mail no ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano(background job);


**Regras de Négocio**
- O link enviado por e-mail para resetar senha, deve expirar em 2h;
- O user precisa confirmar a nova senha ao resetar sua senha;

# Atualização do perfil

**RF**

[x] o user deve poder atualizar seu perfil, nome, e-mail e senha;

**RNF**

**Regras de Négocio**

[x] O user não pode alterar seu email para um em email já utilizado;
[x] Para atualizar sua senha, o usuario deve informar a senha antiga;
[x] Para atualizar sua senha, o usuario precisa confirmar a nova senha;

# Painel do prestador

**RF**

- o prestador deve poder listar seus agendamentos de um dia específico.
- O prestador deve receber uma notificação sempre que houver um novo agendamento.
- o prestador deve poder visualizar as notificaçoes não lidas

**RNF**

- os agendamentos do prestador no dia deve ser armazenados em cache.
- as notificaçoes do prestador devem ser armazenadas no MongoDB;
- as notificacoes do prestador devem ser enviados em tempo-real utilizando socket-io.

**Regras de Négocio**

- A notificação deve ter um status de lida ou não lida para o prestador controlar

# Agendamento de serviços

**RF**

- o user deve poder listar todos os prestadores de seviço cadastrado;
- O user deve poder listar os dias de um mês com pelo menos um horário disponivel de um prestador;
- O user deve poder listar os horários disponiveis de um prestador;
- O user deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenado em cache;

**Regras de Négocio**

- Cada agendamento deve durar 1h exatamente,
- os agendamentos devem estar disponiveis entre 8h as 18h.
- o usuario nào pode agendar em um horario ja ocupado;
- o usuario nao pode agendar um horario que ja passou;
- o usuario nao pode agendar servico consigo mesmo;
