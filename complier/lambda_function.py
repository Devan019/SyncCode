import sys
import subprocess
import io
import json

# Execute Python Code
def execute_py_code(code):
    original_stdout = sys.stdout
    sys.stdout = output_capture = io.StringIO()

    try:
        exec(code)
        output = output_capture.getvalue()
        return output
    except Exception as e:
        return str(e)
    finally:
        sys.stdout = original_stdout

# Execute Java Code
def execute_java_code(code):
    try:
        with open('/tmp/Main.java', 'w') as java_file:
            java_file.write(code)

        compile_result = subprocess.run(
            ['javac', '/tmp/Main.java'],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )

        if compile_result.returncode != 0:
            return compile_result.stderr.decode()

        run_result = subprocess.run(
            ['java', '-classpath', '/tmp', 'Main'],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )

        return run_result.stdout.decode() if run_result.returncode == 0 else run_result.stderr.decode()
    
    except Exception as e:
        return str(e)

# Execute C++ Code
def execute_cpp_code(code):
    try:
        with open('/tmp/temp.cpp', 'w') as cpp_file:
            cpp_file.write(code)

        compile_result = subprocess.run(
            ['g++', '/tmp/temp.cpp', '-o', '/tmp/temp'],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )

        if compile_result.returncode != 0:
            return compile_result.stderr.decode()

        run_result = subprocess.run(
            ['/tmp/temp'],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )

        return run_result.stdout.decode() if run_result.returncode == 0 else run_result.stderr.decode()
    
    except Exception as e:
        return str(e)

# Execute C Code
def execute_c_code(code):
    try:
        with open('/tmp/temp.c', 'w') as c_file:
            c_file.write(code)

        compile_result = subprocess.run(
            ['gcc', '/tmp/temp.c', '-o', '/tmp/temp'],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )

        if compile_result.returncode != 0:
            return compile_result.stderr.decode()

        run_result = subprocess.run(
            ['/tmp/temp'],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )

        return run_result.stdout.decode() if run_result.returncode == 0 else run_result.stderr.decode()
    
    except Exception as e:
        return str(e)

# Execute JavaScript Code
def execute_js_code(code):
    try:
        with open('/tmp/temp.js', 'w') as js_file:
            js_file.write(code)

        run_result = subprocess.run(
            ['node', '/tmp/temp.js'],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )

        return run_result.stdout.decode() if run_result.returncode == 0 else run_result.stderr.decode()
    
    except Exception as e:
        return str(e)

# AWS Lambda Handler
def lambda_handler(event, context):
    body = json.loads(event["body"]) if "body" in event else event

    language = body.get("language", "python")
    code = body.get("code", "")

    if language == 'python':
        result = execute_py_code(code)
    elif language == 'java':
        result = execute_java_code(code)
    elif language == 'cpp':
        result = execute_cpp_code(code)
    elif language == 'c':
        result = execute_c_code(code)
    elif language == 'javascript':
        result = execute_js_code(code)
    else:
        result = f"{language} is not supported!!!"

    return {
        'statusCode': 200,
        'body': json.dumps({'output': result})
    }
