FROM lambci/lambda:python3.6
MAINTAINER tech@21buttons.com

USER root

ENV APP_DIR /var/task

WORKDIR $APP_DIR

COPY requirements.txt .
COPY lib ./lib
COPY bin ./bin

RUN mkdir -p $APP_DIR/lib
RUN pip3 install webdriver_manager
RUN pip3 install -r requirements.txt -t /var/task/lib

