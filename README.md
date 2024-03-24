# AWS OBS Studio to MediaLive and MediaPackage Workflow (Programmatic)

## Description

## Description

This repository provides the code and instructions for setting up a programmatic workflow that automates the process outlined in the following PDF:

- **Workflow PDF:** https://d1.awsstatic.com/awselemental/workflowexamples/Workflow2_Example_OBS_Studio_to_MediaLive_and_MediaPackage.pdf

The PDF details a manual approach to creating a workflow for streaming live content from OBS Studio to Amazon MediaLive using AWS Media Package as the packaging service. This script offers an automated alternative, enabling you to integrate the workflow into your existing systems or schedule it for regular execution.

## Prerequisites

- An AWS account with appropriate permissions for Amazon MediaLive, Media Package, and IAM.
- OBS Studio installed and configured for your streaming needs.
- An understanding of AWS SDK for your preferred programming language (Python, JavaScript, etc.).

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/IgweDaniel/aws-medialive-workflow.git
   ```

2. Create an .env file and add the following contents

   AWS_ACCESS_KEY=<your aws access key>
   AWS_SECRET_KRY=<your aws secret key>
