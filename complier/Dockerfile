FROM public.ecr.aws/lambda/python:3.11

# Install system dependencies (including Node.js)
RUN yum update -y && \
    yum install -y gcc gcc-c++ java-1.8.0-openjdk-devel && \
    curl -fsSL https://rpm.nodesource.com/setup_16.x | bash - && \
    yum install -y nodejs

# Set working directory
WORKDIR ${LAMBDA_TASK_ROOT}

# Copy required files
COPY requirement.txt ./
COPY lambda_function.py ./

# Install Python dependencies
RUN pip install -r requirement.txt

# AWS Lambda requires a specific entrypoint to work inside a container
CMD ["lambda_function.lambda_handler"]
