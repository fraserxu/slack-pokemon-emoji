FROM node:6.3

ENV PROJECT_HOME /opt/slack-pokemon-emoji

ADD . $PROJECT_HOME

WORKDIR $PROJECT_HOME

RUN npm install slack-pokemon-emoji -g

ENTRYPOINT ["slack-pokemon-emoji"]
